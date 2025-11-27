package com.moeda_estudantil.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.mail.from:noreply@moedaestudantil.com}")
    private String fromEmail;

    public void sendTransactionEmailToProfessor(String professorEmail, String professorName,
                                                String studentName, Integer coinValue, String message) {
        try {
            String subject = "Transacao Realizada - Moeda Estudantil";
            String body = buildTransactionProfessorEmailBody(professorName, studentName, coinValue, message);
            sendHtmlEmail(professorEmail, subject, body);
            logger.info("Email de transacao enviado para o professor: {}", professorEmail);
        } catch (Exception e) {
            logger.error("Erro ao enviar email para o professor: {}", professorEmail, e);
        }
    }

    public void sendTransactionEmailToStudent(String studentEmail, String studentName,
                                              String professorName, Integer coinValue, String message) {
        try {
            String subject = "Voce Recebeu Moedas! - Moeda Estudantil";
            String body = buildTransactionStudentEmailBody(studentName, professorName, coinValue, message);
            sendHtmlEmail(studentEmail, subject, body);
            logger.info("Email de transacao enviado para o aluno: {}", studentEmail);
        } catch (Exception e) {
            logger.error("Erro ao enviar email para o aluno: {}", studentEmail, e);
        }
    }

    public void sendExchangeEmailToStudent(String studentEmail, String studentName,
                                           String advantageName, Integer coinValue,
                                           String redemptionCode, byte[] qrCodeImage) {
        try {
            String subject = "Vantagem Resgatada - Moeda Estudantil";
            String body = buildExchangeStudentEmailBody(studentName, advantageName, coinValue, redemptionCode);
            sendHtmlEmailWithAttachment(studentEmail, subject, body, qrCodeImage, "qrcode.png");
            logger.info("Email de troca de vantagem enviado para o aluno: {}", studentEmail);
        } catch (Exception e) {
            logger.error("Erro ao enviar email de troca para o aluno: {}", studentEmail, e);
        }
    }

    public void sendExchangeEmailToCompany(String companyEmail, String companyName,
                                           String studentName, String advantageName,
                                           String redemptionCode) {
        try {
            String subject = "Nova Troca de Vantagem - Moeda Estudantil";
            String body = buildExchangeCompanyEmailBody(companyName, studentName, advantageName, redemptionCode);
            sendHtmlEmail(companyEmail, subject, body);
            logger.info("Email de troca de vantagem enviado para a empresa: {}", companyEmail);
        } catch (Exception e) {
            logger.error("Erro ao enviar email para a empresa: {}", companyEmail, e);
        }
    }

    private void sendHtmlEmail(String to, String subject, String htmlBody) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlBody, true);
        mailSender.send(message);
    }

    private void sendHtmlEmailWithAttachment(String to, String subject, String htmlBody,
                                             byte[] attachment, String attachmentName) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlBody, true);
        if (attachment != null) {
            helper.addInline("qrcode", new ByteArrayResource(attachment), "image/png");
        }
        mailSender.send(message);
    }

    private String buildTransactionProfessorEmailBody(String professorName, String studentName,
                                                      Integer coinValue, String message) {
        return String.format("""
            <html><body style="font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #667eea; color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1>Transacao Realizada!</h1></div>
            <div style="background: #f9f9f9; padding: 30px;">
            <p>Ola <strong>%s</strong>,</p>
            <p>Sua transacao de moedas foi realizada com sucesso!</p>
            <div style="background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea;">
            <p><strong>Aluno:</strong> %s</p>
            <p><strong>Valor:</strong> <span style="font-size: 24px; color: #667eea;">%d moedas</span></p>
            <p><strong>Mensagem:</strong> %s</p>
            </div></div></div></body></html>
            """, professorName, studentName, coinValue, message);
    }

    private String buildTransactionStudentEmailBody(String studentName, String professorName,
                                                    Integer coinValue, String message) {
        return String.format("""
            <html><body style="font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #667eea; color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1>Voce Recebeu Moedas!</h1></div>
            <div style="background: #f9f9f9; padding: 30px;">
            <p>Ola <strong>%s</strong>,</p>
            <p>Parabens! Voce recebeu moedas do professor <strong>%s</strong>!</p>
            <div style="background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #28a745;">
            <p style="text-align: center; font-size: 32px; color: #28a745;">+ %d moedas</p>
            <p><strong>Mensagem:</strong> "%s"</p>
            </div></div></div></body></html>
            """, studentName, professorName, coinValue, message);
    }

    private String buildExchangeStudentEmailBody(String studentName, String advantageName,
                                                 Integer coinValue, String redemptionCode) {
        return String.format("""
            <html><body style="font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #f5576c; color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1>Vantagem Resgatada!</h1></div>
            <div style="background: #f9f9f9; padding: 30px;">
            <p>Ola <strong>%s</strong>,</p>
            <p>Voce trocou <strong>%d moedas</strong> por: <strong>%s</strong></p>
            <div style="text-align: center; background: white; padding: 30px; margin: 20px 0;">
            <p><strong>Codigo de Resgate:</strong></p>
            <p style="font-size: 28px; color: #f5576c; font-family: monospace;">%s</p>
            <p><strong>QR Code:</strong></p>
            <img src="cid:qrcode" alt="QR Code" style="max-width: 300px;" />
            </div>
            <p><strong>Importante:</strong> Apresente este codigo na empresa parceira.</p>
            </div></div></body></html>
            """, studentName, coinValue, advantageName, redemptionCode);
    }

    private String buildExchangeCompanyEmailBody(String companyName, String studentName,
                                                 String advantageName, String redemptionCode) {
        return String.format("""
            <html><body style="font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #4facfe; color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1>Nova Troca de Vantagem</h1></div>
            <div style="background: #f9f9f9; padding: 30px;">
            <p>Ola <strong>%s</strong>,</p>
            <p>Um aluno resgatou uma vantagem!</p>
            <div style="background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #4facfe;">
            <p><strong>Aluno:</strong> %s</p>
            <p><strong>Vantagem:</strong> %s</p>
            <p><strong>Codigo:</strong> <span style="font-size: 24px; font-family: monospace;">%s</span></p>
            </div></div></div></body></html>
            """, companyName, studentName, advantageName, redemptionCode);
    }
}