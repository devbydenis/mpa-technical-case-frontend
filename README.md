# Stock Transaction Management System - Frontend

Aplikasi frontend **Sistem Manajemen Transaksi Stok**, platform manajemen inventaris berbasis web untuk bisnis grosir/eceran. Dibangun dengan Next.js 16, React 19, dan Material UI 9.

---

## Daftar Isi

- [Tech Stack](#tech-stack)
- [Fitur](#fitur)
  - [Master Barang (Items)](#master-barang-items)
  - [Transaksi Stok (Transactions)](#transaksi-stok-transactions)
- [Memulai](#memulai)
  - [Prasyarat](#prasyarat)
  - [Install Dependensi](#install-dependensi)
  - [Environment Variables](#environment-variables)
  - [Development](#development)
  - [Build & Start](#build--start)
  - [Lint](#lint)
- [Struktur Project](#struktur-project)
- [API Endpoints](#api-endpoints)

---

## Tech Stack

### Core

| Teknologi | Versi | Keterangan |
|---|---|---|
| Next.js (App Router) | 16.2.10 | Framework React dengan App Router |
| React | 19.2.4 | Library UI |
| TypeScript | ^5 | Static type checking |
| Tailwind CSS | ^4 | Utility-first CSS framework |

### UI & Components

| Teknologi | Versi | Keterangan |
|---|---|---|
| MUI (Material UI) | ^9.2.0 | Component library |
| @mui/icons-material | ^9.2.0 | Set ikon |
| @emotion/react | ^11.14.0 | CSS-in-JS (peer dep MUI) |
| @emotion/styled | ^11.14.1 | CSS-in-JS (peer dep MUI) |

### Data & Forms

| Teknologi | Versi | Keterangan |
|---|---|---|
| TanStack React Query | ^5.101.2 | Manajemen & caching server state |
| Axios | ^1.18.1 | HTTP client |
| React Hook Form | ^7.82.0 | Manajemen state form |
| @hookform/resolvers | ^5.4.0 | Zod resolver untuk React Hook Form |
| Zod | ^4.4.3 | Schema validation |

### Dev Tools

| Teknologi | Versi | Keterangan |
|---|---|---|
| ESLint | ^9 | Linting |
| eslint-config-next | 16.2.10 | Aturan ESLint untuk Next.js |
| babel-plugin-react-compiler | 1.0.0 | React Compiler (eksperimental) |

---

## Fitur

### Master Barang (Items)

- **Daftar Barang** — Tabel paginated dengan kolom: Nama, SKU, Satuan Beli, Qty Beli, Satuan Jual, Qty Jual, Konversi, Stok Saat Ini, Aksi
- **Pencarian** — Pencarian debounce (300ms) berdasarkan nama atau SKU
- **Tambah Barang** — Form dengan validasi Zod (nama, SKU, satuan beli/jual, qty, konversi)
- **Edit Barang** — Form ter-pre-fill dengan data yang sama
- **Hapus Barang** — Dialog konfirmasi sebelum penghapusan
- **Notifikasi** — Snackbar sukses/error untuk semua operasi (auto-hide 4 detik)
- **Loading State** — Spinner overlay saat pengambilan data
- **Error State** — Komponen error dengan tombol retry
- **Pagination** — Server-side pagination (10/25/50 baris per halaman)

### Transaksi Stok (Transactions)

- **Daftar Transaksi** — Tabel paginated dengan kolom: No. Urut, Tanggal, Barang, Qty, Satuan, Qty Terkonversi, Status, Aksi
- **Pencarian** — Pencarian debounce (300ms) berdasarkan nomor urut atau nama barang
- **Tambah Transaksi** — Form dengan:
  - Date picker untuk tanggal transaksi
  - Nomor urut otomatis (`STK/{Day}/{RomanMonth}/{Year}/?????`) atau input manual
  - Pilihan barang (dropdown) dengan data satuan
  - Tipe satuan (Pembelian/Penjualan)
  - Input kuantitas dengan preview konversi real-time
  - Deskripsi (opsional)
- **Detail Transaksi** — Halaman detail menampilkan semua data transaksi, termasuk status, waktu dibuat, dan waktu pembatalan (jika dibatalkan)
- **Batalkan Transaksi** — Dialog konfirmasi untuk membatalkan transaksi aktif (membalik stok otomatis)
- **Notifikasi** — Snackbar sukses/error untuk semua operasi
- **Loading State** — Spinner overlay saat pengambilan data
- **Error State** — Komponen error dengan tombol retry
- **Pagination** — Server-side pagination (10/25/50 baris per halaman)

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm, yarn, atau pnpm
- Backend NestJS berjalan di `http://localhost:3000`

### Install Dependensi

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

Aplikasi akan berjalan di **http://localhost:3001** (port 3001 karena backend menggunakan port 3000). Development server menggunakan Turbopack untuk rebuild yang lebih cepat.

---

## Struktur Project

```
src/
├── app/
│   ├── layout.tsx                       # Root layout (Geist fonts, Providers, AppLayout)
│   ├── page.tsx                         # Redirect ke /items
│   ├── globals.css                      # Tailwind CSS
│   ├── items/
│   │   ├── page.tsx                     # Daftar barang (paginated, search, delete)
│   │   ├── create/
│   │   │   └── page.tsx                 # Tambah barang
│   │   └── [id]/
│   │       └── page.tsx                 # Edit barang
│   └── transactions/
│       ├── page.tsx                     # Daftar transaksi (paginated, search, cancel)
│       ├── create/
│       │   └── page.tsx                 # Tambah transaksi
│       └── [id]/
│           └── page.tsx                 # Detail transaksi + batalkan
├── components/
│   ├── providers.tsx                    # ThemeProvider + React Query + Snackbar
│   ├── snackbar-provider.tsx            # Global notifikasi
│   ├── layout/
│   │   ├── app-layout.tsx              # App shell (sidebar + content)
│   │   └── sidebar.tsx                 # Sidebar navigasi
│   ├── ui/
│   │   ├── confirm-dialog.tsx          # Dialog konfirmasi
│   │   ├── data-table.tsx              # Tabel generic dengan pagination
│   │   ├── error-state.tsx             # Error state dengan tombol retry
│   │   ├── form-field.tsx              # Wrapper MUI TextField
│   │   ├── loading-overlay.tsx         # Loading spinner
│   │   ├── page-header.tsx             # Header halaman
│   │   └── search-field.tsx            # Input pencarian debounce
│   ├── items/
│   │   ├── item-columns.tsx            # Kolom tabel barang
│   │   └── item-form.tsx               # Form barang (Zod + React Hook Form)
│   └── transactions/
│       ├── transaction-columns.tsx     # Kolom tabel transaksi
│       ├── transaction-detail.tsx      # Detail transaksi
│       └── transaction-form.tsx        # Form transaksi (Zod + React Hook Form)
├── constants/
│   ├── layout.constants.ts             # DRAWER_WIDTH = 240
│   └── transaction.constants.ts        # ROMAN_MONTHS, INDONESIAN_DAYS
├── hooks/
│   ├── use-items.ts                    # React Query hooks untuk barang
│   └── use-transactions.ts             # React Query hooks untuk transaksi
├── lib/
│   ├── api.ts                          # Axios instance dengan interceptors
│   └── query-client.ts                 # QueryClient singleton
└── types/
    ├── index.ts                        # Barrel export
    ├── api.types.ts                    # ApiResponse<T>, PaginatedData<T>
    ├── item.types.ts                   # Item, CreateItemPayload, UpdateItemPayload
    ├── transaction.types.ts            # StockTransaction, CreateTransactionPayload
    └── components/
        ├── confirm-dialog.types.ts     # ConfirmDialogProps
        ├── data-table.types.ts         # Column<T>, DataTableProps<T>
        ├── search-field.types.ts       # SearchFieldProps
        └── snackbar-provider.types.ts  # SnackbarContextValue
```

---

## API Endpoints

Frontend terintegrasi dengan backend NestJS menggunakan format respons:

```json
{
  "success": true,
  "data": {},
  "message": "string"
}
```

### Items

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/items?page=&limit=&q=` | Ambil daftar barang (paginated) |
| GET | `/items/:id` | Ambil detail barang |
| POST | `/items` | Tambah barang baru |
| PUT | `/items/:id` | Update barang |
| DELETE | `/items/:id` | Hapus barang |

### Transaksi Stok

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/stock-transactions?page=&limit=&q=` | Ambil daftar transaksi (paginated) |
| GET | `/stock-transactions/:id` | Ambil detail transaksi |
| POST | `/stock-transactions` | Tambah transaksi baru |
| PATCH | `/stock-transactions/:id/cancel` | Batalkan transaksi (membalik stok) |
