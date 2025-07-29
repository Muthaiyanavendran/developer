import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
})
export class InvoiceFormComponent {
  generatedQRCode: string = '';
  @Input() invoiceData: any;
  @Output() invoiceDataChange = new EventEmitter<any>();
  @Output() qrGenerated = new EventEmitter<string>();

  selectedImage: string = '';   // Base64 logo image
  clientEmail: string = '';     // User-entered email
  clientName: string = '';      // Client name

  constructor(private http: HttpClient) {}

  generateInvoice() {
    console.log('📦 Sending this invoice:', this.invoiceData);

    this.http.post<any>('http://localhost:8080/api/invoices/generate', this.invoiceData)
      .subscribe({
        next: (res) => {
          console.log("✅ Response received:", res);
          if (res && res.qrCode) {
            this.generatedQRCode = res.qrCode;
          } else {
            console.warn("⚠️ QR code not found in response");
          }
        },
        error: (err) => {
          console.error("❌ HTTP Error occurred:", err);
          this.generatedQRCode = "Fallback QR: QR generation failed.";
        }
      });
  }

  sendInvoiceEmail() {
    const payload = {
      email: this.clientEmail,
      clientName: this.clientName,
      logoBase64: this.selectedImage,
      invoiceNumber: this.invoiceData.invoiceNumber,
      date: this.invoiceData.date,
      items: this.invoiceData.items,
      totalAmount: this.invoiceData.total
    };

    this.http.post('http://localhost:8080/send-invoice', payload).subscribe({
      next: () => alert('✅ Invoice sent successfully!'),
      error: () => alert('❌ Error sending invoice')
    });
  }

  addItem() {
    this.invoiceData.items.push({ name: '', qty: null, price: null });
  }

  removeItem(index: number) {
    this.invoiceData.items.splice(index, 1);
  }
}
