package com.moeda_estudantil.services;

import com.moeda_estudantil.infrastructure.exception.SendEmailException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    /**
     * Envia um email simples
     * @param to Destinatário
     * @param subject Assunto
     * @param body Corpo do email
     */
    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            message.setFrom(fromEmail);
            
            mailSender.send(message);
        } catch (MailException e) {
            throw new SendEmailException("Falha ao enviar e-mail: " + e.getMessage());
        }
    }

    /**
     * Envia email de notificação ao professor quando ele envia moedas
     * @param professorEmail Email do professor
     * @param professorName Nome do professor
     * @param studentName Nome do aluno
     * @param coinValue Quantidade de moedas enviadas
     */
    public void sendProfessorNotification(String professorEmail, String professorName, 
                                         String studentName, Integer coinValue) {
        String subject = "Confirmação de Envio de Moedas - Sistema Moeda Estudantil";
        String body = String.format(
            "Olá, Professor(a) %s!\n\n" +
            "Este é um email de confirmação do Sistema de Moeda Estudantil.\n\n" +
            "Você enviou %d moedas ao aluno %s.\n\n" +
            "Transação realizada com sucesso!\n\n" +
            "Atenciosamente,\n" +
            "Sistema de Moeda Estudantil",
            professorName, coinValue, studentName
        );
        
        sendEmail(professorEmail, subject, body);
    }

    /**
     * Envia email de notificação ao aluno quando ele recebe moedas
     * @param studentEmail Email do aluno
     * @param studentName Nome do aluno
     * @param professorName Nome do professor
     * @param coinValue Quantidade de moedas recebidas
     * @param message Mensagem do professor
     */
    public void sendStudentNotification(String studentEmail, String studentName, 
                                       String professorName, Integer coinValue, String message) {
        String subject = "Você Recebeu Moedas! - Sistema Moeda Estudantil";
        String body = String.format(
            "Olá, %s!\n\n" +
            "Ótimas notícias! Você recebeu %d moedas do professor %s.\n\n" +
            "Mensagem do professor:\n\"%s\"\n\n" +
            "Suas moedas já estão disponíveis em sua conta e podem ser usadas para resgatar vantagens!\n\n" +
            "Atenciosamente,\n" +
            "Sistema de Moeda Estudantil",
            studentName, coinValue, professorName, message
        );
        
        sendEmail(studentEmail, subject, body);
    }
}