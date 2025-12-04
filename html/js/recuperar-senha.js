// recuperar-senha.js — recuperação de senha para alunos, professores e empresas
const API_BASE = 'https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/';

// Função para garantir que o EmailJS está inicializado
function ensureEmailJSInitialized() {
  if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG && EMAILJS_CONFIG.PUBLIC_KEY) {
    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      return true;
    } catch (error) {
      console.error('Erro ao inicializar EmailJS:', error);
      return false;
    }
  }
  return false;
}

// Função para enviar email usando EmailJS
async function sendEmail(templateId, templateParams) {
  try {
    if (typeof emailjs === 'undefined') {
      console.error('EmailJS não está carregado');
      return false;
    }
    
    // Garantir que está inicializado
    if (!ensureEmailJSInitialized()) {
      console.error('EmailJS não foi inicializado corretamente');
      return false;
    }
    
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      templateId,
      templateParams
    );
    
    console.log('Email enviado com sucesso:', response);
    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
}

// Função para enviar email FOR ME (notificação)
async function sendEmailForMe(userEmail, userName, userType, action) {
  const time = new Date().toLocaleString('pt-BR');
  const title = `Recuperação de Senha - ${userType.charAt(0).toUpperCase() + userType.slice(1)}`;
  
  const templateParams = {
    email: EMAILJS_CONFIG.NOTIFICATION_EMAIL,
    user_email: userEmail,
    user_name: userName || 'Usuário',
    user_type: userType,
    action: action, // 'solicitacao' ou 'alteracao'
    time: time,
    title: title
  };
  
  return await sendEmail(EMAILJS_CONFIG.TEMPLATE_ID_FOR_ME, templateParams);
}

// Função para enviar email FOR SENDER (confirmação para usuário)
async function sendEmailForSender(userEmail, userName, userType, action) {
  const time = new Date().toLocaleString('pt-BR');
  const title = action === 'solicitacao' 
    ? 'Solicitação de Recuperação de Senha'
    : 'Senha Alterada com Sucesso';
  
  const templateParams = {
    email: userEmail,
    user_name: userName || 'Usuário',
    user_type: userType,
    action: action,
    time: time,
    title: title
  };
  
  return await sendEmail(EMAILJS_CONFIG.TEMPLATE_ID_FOR_SENDER, templateParams);
}

document.addEventListener('DOMContentLoaded', () => {
  // Obter tipo de usuário da URL
  const urlParams = new URLSearchParams(window.location.search);
  const tipo = urlParams.get('tipo') || 'aluno'; // padrão: aluno
  
  let usuarioId = null;
  let usuarioData = null;

  const emailForm = document.getElementById('emailForm');
  const passwordForm = document.getElementById('passwordForm');
  const emailInput = document.getElementById('email');
  const newPasswordInput = document.getElementById('newPassword');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const errorMessage = document.getElementById('errorMessage');
  const successMessage = document.getElementById('successMessage');
  const passwordErrorMessage = document.getElementById('passwordErrorMessage');
  const passwordSuccessMessage = document.getElementById('passwordSuccessMessage');
  const subtitle = document.getElementById('subtitle');

  // Atualizar subtítulo baseado no tipo
  const tipos = {
    aluno: 'aluno',
    professor: 'professor',
    empresa: 'empresa'
  };
  
  if (tipos[tipo]) {
    subtitle.textContent = `Informe seu e-mail para recuperar sua senha de ${tipos[tipo]}`;
  }

  // Funções auxiliares
  function showError(msg, isPassword = false) {
    if (isPassword) {
      passwordErrorMessage.textContent = msg;
      passwordErrorMessage.style.display = 'block';
      passwordSuccessMessage.style.display = 'none';
    } else {
      errorMessage.textContent = msg;
      errorMessage.style.display = 'block';
      successMessage.style.display = 'none';
    }
  }

  function showSuccess(msg, isPassword = false) {
    if (isPassword) {
      passwordSuccessMessage.textContent = msg;
      passwordSuccessMessage.style.display = 'block';
      passwordErrorMessage.style.display = 'none';
    } else {
      successMessage.textContent = msg;
      successMessage.style.display = 'block';
      errorMessage.style.display = 'none';
    }
  }

  function clearError(isPassword = false) {
    if (isPassword) {
      passwordErrorMessage.textContent = '';
      passwordErrorMessage.style.display = 'none';
    } else {
      errorMessage.textContent = '';
      errorMessage.style.display = 'none';
    }
  }

  // Determinar endpoint baseado no tipo
  function getEndpointByType() {
    switch (tipo) {
      case 'aluno':
        return 'students';
      case 'professor':
        return 'professors';
      case 'empresa':
        return 'companies';
      default:
        return 'students';
    }
  }

  // Formulário de email
  emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();

    const email = emailInput.value.trim();

    if (!email) {
      showError('Informe seu e-mail.');
      return;
    }

    try {
      const endpoint = getEndpointByType();
      const resp = await fetch(`${API_BASE}${endpoint}/email/${email}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (resp.status === 404) {
        showError('E-mail não encontrado. Verifique se o e-mail está correto.');
        return;
      }

      if (!resp.ok) {
        showError('Erro ao buscar usuário. Tente novamente mais tarde.');
        return;
      }

      const data = await resp.json();
      usuarioData = Array.isArray(data) ? data[0] : data;

      if (!usuarioData || !usuarioData.id) {
        showError('Usuário não encontrado ou resposta inválida.');
        return;
      }

      usuarioId = usuarioData.id;
      
      // Enviar emails de notificação
      const userName = usuarioData.name || usuarioData.companyName || 'Usuário';
      const userTypeLabel = tipo === 'aluno' ? 'Aluno' : tipo === 'professor' ? 'Professor' : 'Empresa';
      
      // Enviar email FOR ME (notificação)
      sendEmailForMe(email, userName, userTypeLabel, 'solicitacao').catch(err => 
        console.error('Erro ao enviar email FOR ME:', err)
      );
      
      // Enviar email FOR SENDER (confirmação para usuário)
      sendEmailForSender(email, userName, userTypeLabel, 'solicitacao').catch(err => 
        console.error('Erro ao enviar email FOR SENDER:', err)
      );
      
      showSuccess('E-mail verificado com sucesso! Agora você pode definir uma nova senha.');
      
      // Mostrar formulário de senha e esconder formulário de email
      emailForm.style.display = 'none';
      passwordForm.style.display = 'block';
    } catch (err) {
      console.error('Erro ao verificar email:', err);
      showError('Erro ao conectar com o servidor.');
    }
  });

  // Formulário de nova senha
  passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError(true);

    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!newPassword || !confirmPassword) {
      showError('Preencha todos os campos.', true);
      return;
    }

    if (newPassword.length < 6) {
      showError('A senha deve ter no mínimo 6 caracteres.', true);
      return;
    }

    if (newPassword !== confirmPassword) {
      showError('As senhas não coincidem.', true);
      return;
    }

    if (!usuarioId || !usuarioData) {
      showError('Erro: dados do usuário não encontrados. Por favor, recarregue a página.', true);
      return;
    }

    try {
      const endpoint = getEndpointByType();
      
      // Preparar dados para atualização
      let updateData = {};
      
      if (tipo === 'aluno') {
        updateData = {
          name: usuarioData.name,
          email: usuarioData.email,
          password: newPassword,
          socialId: usuarioData.socialId,
          document: usuarioData.document,
          address: usuarioData.address || 'Não informado',
          course: usuarioData.course || '',
          institutionId: usuarioData.institutionId
        };
      } else if (tipo === 'professor') {
        updateData = {
          name: usuarioData.name,
          email: usuarioData.email,
          password: newPassword,
          socialId: usuarioData.socialId,
          department: usuarioData.department || '',
          institutionId: usuarioData.institutionId
        };
      } else if (tipo === 'empresa') {
        updateData = {
          companyNickname: usuarioData.companyNickname,
          companyName: usuarioData.companyName,
          companyDocument: usuarioData.companyDocument,
          email: usuarioData.email,
          password: newPassword
        };
      }

      const resp = await fetch(`${API_BASE}${endpoint}/${tipo === 'aluno' ? 'student' : tipo === 'professor' ? 'professor' : 'company'}/${usuarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        showError(errorData.message || 'Erro ao alterar senha. Tente novamente mais tarde.', true);
        return;
      }

      // Enviar emails de confirmação de alteração de senha
      const userName = usuarioData.name || usuarioData.companyName || 'Usuário';
      const userEmail = usuarioData.email;
      const userTypeLabel = tipo === 'aluno' ? 'Aluno' : tipo === 'professor' ? 'Professor' : 'Empresa';
      
      // Enviar email FOR ME (notificação)
      sendEmailForMe(userEmail, userName, userTypeLabel, 'alteracao').catch(err => 
        console.error('Erro ao enviar email FOR ME:', err)
      );
      
      // Enviar email FOR SENDER (confirmação para usuário)
      sendEmailForSender(userEmail, userName, userTypeLabel, 'alteracao').catch(err => 
        console.error('Erro ao enviar email FOR SENDER:', err)
      );
      
      showSuccess('Senha alterada com sucesso! Redirecionando para o login...', true);
      
      // Redirecionar para a página de login após 2 segundos
      setTimeout(() => {
        if (tipo === 'aluno') {
          window.location.href = 'index.html';
        } else if (tipo === 'professor') {
          window.location.href = 'login-professor.html';
        } else if (tipo === 'empresa') {
          window.location.href = 'login-empresa.html';
        }
      }, 2000);
    } catch (err) {
      console.error('Erro ao alterar senha:', err);
      showError('Erro ao conectar com o servidor.', true);
    }
  });
});

