package com.moeda_estudantil.services;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class QRCodeService {

    private static final Logger logger = LoggerFactory.getLogger(QRCodeService.class);

    @Value("${app.qrcode.width:300}")
    private int qrCodeWidth;

    @Value("${app.qrcode.height:300}")
    private int qrCodeHeight;

    /**
     * Gera um QR Code em formato de array de bytes (PNG)
     *
     * @param content Conteudo a ser codificado no QR Code
     * @return Array de bytes da imagem PNG do QR Code
     */
    public byte[] generateQRCodeImage(String content) {
        try {
            // Configuracoes do QR Code
            Map<EncodeHintType, Object> hints = new HashMap<>();
            hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
            hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
            hints.put(EncodeHintType.MARGIN, 1);

            // Gerar matriz do QR Code
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(
                    content,
                    BarcodeFormat.QR_CODE,
                    qrCodeWidth,
                    qrCodeHeight,
                    hints
            );

            // Converter para imagem PNG
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);

            byte[] qrCodeBytes = outputStream.toByteArray();
            logger.info("QR Code gerado com sucesso para o conteudo: {}", content);

            return qrCodeBytes;

        } catch (WriterException | IOException e) {
            logger.error("Erro ao gerar QR Code para o conteudo: {}", content, e);
            throw new RuntimeException("Falha ao gerar QR Code", e);
        }
    }

    /**
     * Gera um QR Code especificamente para codigo de resgate de vantagem
     * Formato: RESGATE:{redemptionCode}:{advantageId}
     *
     * @param redemptionCode Codigo de resgate unico
     * @param advantageId ID da vantagem
     * @return Array de bytes da imagem PNG do QR Code
     */
    public byte[] generateRedemptionQRCode(String redemptionCode, Long advantageId) {
        String qrContent = String.format("RESGATE:%s:%d", redemptionCode, advantageId);
        logger.info("Gerando QR Code de resgate para codigo: {}", redemptionCode);
        return generateQRCodeImage(qrContent);
    }

    /**
     * Gera um QR Code simples apenas com o codigo de resgate
     *
     * @param redemptionCode Codigo de resgate unico
     * @return Array de bytes da imagem PNG do QR Code
     */
    public byte[] generateSimpleRedemptionQRCode(String redemptionCode) {
        logger.info("Gerando QR Code simples para codigo: {}", redemptionCode);
        return generateQRCodeImage(redemptionCode);
    }
}