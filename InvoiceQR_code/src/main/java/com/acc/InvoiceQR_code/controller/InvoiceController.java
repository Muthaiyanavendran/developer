package com.acc.InvoiceQR_code.controller;

import com.acc.InvoiceQR_code.entity.Invoice;
import com.acc.InvoiceQR_code.util.QRCodeGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.zxing.WriterException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:4200")
public class InvoiceController {

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> generateInvoice(@RequestBody Invoice invoice) throws IOException, WriterException {
        ObjectMapper mapper = new ObjectMapper();
        String invoiceJson = mapper.writeValueAsString(invoice);

        byte[] qrBytes = QRCodeGenerator.generateQRCode(invoiceJson, 200, 200);
        String base64QR = Base64.getEncoder().encodeToString(qrBytes);

        Map<String, Object> response = new HashMap<>();
        response.put("invoice", invoice);
        response.put("qrCode", base64QR);

        return ResponseEntity.ok(response);
    }
}
