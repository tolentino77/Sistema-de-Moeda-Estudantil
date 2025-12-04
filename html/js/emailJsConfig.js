// 1. Acesse https://www.emailjs.com e crie uma conta
// 2. Crie um Service com o ID: service_f2zek8w (ou atualize o SERVICE_ID abaixo)
// 3. Crie dois templates de email:
//    - Template "FOR ME": Para receber notificações (configure seu email fixo no campo "To Email")
//    - Template "FOR SENDER": Para enviar confirmação ao usuário (configure {{email}} no campo "To Email")
// 4. Copie os IDs dos templates e cole abaixo
// 5. Copie sua Public Key (Account > API Keys) e cole abaixo
// 6. Configure seu email fixo para receber notificações

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_f2zek8w',
  
  TEMPLATE_ID_FOR_ME: 'template_xs59mnt',
  
  TEMPLATE_ID_FOR_SENDER: 'template_m12a8oy',
  
  // Public Key do EmailJS (encontre em Account > API Keys)
  PUBLIC_KEY: '', // Substitua pela sua Public Key do EmailJS
  
  // Email fixo para receber notificações (usado no template FOR ME)
  // IMPORTANTE: Este email também deve estar configurado no campo "To Email" do template FOR ME
  NOTIFICATION_EMAIL: 'seu-email@exemplo.com' // Substitua pelo seu email fixo
};

// Função para inicializar o EmailJS
function initEmailJS() {
  if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY) {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('EmailJS inicializado com sucesso');
  } else {
    if (typeof emailjs === 'undefined') {
      console.warn('EmailJS não foi carregado. Verifique se o script foi incluído no HTML.');
    }
    if (!EMAILJS_CONFIG.PUBLIC_KEY) {
      console.warn('Public Key do EmailJS não configurada. Configure em emailJsConfig.js');
    }
  }
}

// Aguardar o carregamento do EmailJS
// O EmailJS será inicializado quando o script for carregado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Aguardar um pouco para garantir que o EmailJS foi carregado
    setTimeout(initEmailJS, 100);
  });
} else {
  setTimeout(initEmailJS, 100);
}

