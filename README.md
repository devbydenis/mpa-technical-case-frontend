# Stock Transaction Management System - Frontend

Frontend aplikasi **Sistem Manajemen Transaksi Stok Barang** untuk perusahaan grosir/eceran yang dikerjakan sebagai technical test untuk **Multi Power Aditama**.

## Tech Stack

| Technology | Version |
|---|---|
| Next.js (App Router) | 16.2.10 |
| React | 19.2.4 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |
| MUI (Material UI) | ^9.2.0 |
| TanStack React Query | ^5.101.2 |
| Axios | ^1.18.1 |
| React Hook Form | ^7.82.0 |
| Zod | ^4.4.3 |

## Fitur

### Master Barang (Items) - Sudah Implementasi

- **Daftar Barang** - Tabel paginated dengan kolom: Nama, SKU, Satuan Beli, Qty Beli, Satuan Jual, Qty Jual, Konversi, Stok Saat Ini, Aksi
- **Pencarian** - Pencarian debounce (300ms) berdasarkan nama atau SKU
- **Tambah Barang** - Form dengan validasi Zod (nama, SKU, satuan beli/jual, qty, konversi)
- **Edit Barang** - Form ter-pre-fill dengan data yang sama
- **Hapus Barang** - Konfirmasi dialog sebelum penghapusan
- **Notifikasi** - Snackbar sukses/error untuk semua operasi (auto-hide 4 detik)
- **Loading State** - Spinner overlay saat data fetching
- **Pagination** - Server-side pagination (10/25/50 baris per halaman)

### Transaksi Stok (Transactions) - Belum Implementasi

Halaman placeholder sudah ada, tetapi CRUD transaksi stok belum diimplementasikan.

## Getting Started

### Prerequisites

- Node.js >= 18
- npm, yarn, atau pnpm
- Backend NestJS berjalan di `http://localhost:3000`

### Install Dependencies

```bash
npm install
```

### Environment Variables

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Aplikasi akan berjalan di **http://localhost:3001** (port 3001 karena backend menggunakan port 3000).

### Build & Start

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Struktur Project

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (Geist fonts, Providers, AppLayout)
│   ├── page.tsx                    # Redirect ke /items
│   ├── globals.css                 # Tailwind CSS
│   ├── items/
│   │   ├── page.tsx                # Daftar barang
│   │   ├── create/page.tsx         # Tambah barang
│   │   └── [id]/page.tsx          # Edit barang
│   └── transactions/
│       └── page.tsx                # Transaksi stok (placeholder)
├── components/
│   ├── providers.tsx               # ThemeProvider + React Query + Snackbar
│   ├── snackbar-provider.tsx       # Global notifikasi
│   ├── layout/
│   │   ├── app-layout.tsx         # App shell (sidebar + content)
│   │   └── sidebar.tsx            # Sidebar navigasi
│   ├── ui/
│   │   ├── data-table.tsx         # Komponen tabel generic dengan pagination
│   │   ├── confirm-dialog.tsx     # Dialog konfirmasi
│   │   ├── page-header.tsx        # Header halaman
│   │   ├── search-field.tsx       # Input pencarian debounce
│   │   ├── form-field.tsx         # Wrapper MUI TextField
│   │   └── loading-overlay.tsx    # Loading spinner
│   └── items/
│       ├── item-form.tsx          # Form barang (Zod + React Hook Form)
│       └── item-columns.tsx       # Kolom tabel barang
├── hooks/
│   └── use-items.ts               # React Query hooks untuk barang
├── lib/
│   ├── api.ts                     # Axios instance dengan interceptors
│   └── query-client.ts           # QueryClient singleton
├── types/
│   ├── api.ts                     # ApiResponse<T>, PaginatedData<T>
│   ├── item.ts                    # Item, CreateItemPayload, UpdateItemPayload
│   └── transaction.ts            # StockTransaction, CreateTransactionPayload
└── constants/
    └── layout.ts                  # DRAWER_WIDTH = 240
```

## API Endpoints

Frontend terintegrasi dengan backend NestJS menggunakan format respons:

```json
{
  "success": true,
  "data": {},
  "message": "string"
}
```

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/items?page=&limit=&q=` | Ambil daftar barang (paginated) |
| GET | `/items/:id` | Ambil detail barang |
| POST | `/items` | Tambah barang baru |
| PUT | `/items/:id` | Update barang |
| DELETE | `/items/:id` | Hapus barang |

## License

Technical test - Multi Power Aditama
