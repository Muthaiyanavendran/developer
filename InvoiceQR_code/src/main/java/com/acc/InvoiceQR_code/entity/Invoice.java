package com.acc.InvoiceQR_code.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Invoice {
    private String invoiceNumber;
    private String date;
    private String clientName;
    private String streetAddress;
    private String cityStateCountry;
    private String zipCode;
    private String companyAddress;
    private List<Item> items;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Item {
        private String name;
        private int qty;
        private double price;
    }
}
