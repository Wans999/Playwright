# Playwright + Cucumber BDD Framework

Framework automation testing menggunakan Playwright dan Cucumber dengan pola Page Object Model (POM).

---

## Tech Stack

- **Playwright** — browser automation
- **Cucumber** — BDD framework
- **multiple-cucumber-html-reporter** — HTML report generator
- **Jenkins** — CI/CD

---

## Struktur Project

```
playwright/
├── features/
│   ├── login.feature        # scenario login (positive & negative)
│   └── inventory.feature    # scenario halaman produk
├── pages/
│   ├── loginPage.js         # POM login page
│   └── inventoryPage.js     # POM inventory page
├── steps/
│   ├── loginSteps.js        # step definitions login
│   └── inventorySteps.js    # step definitions inventory
├── support/
│   └── world.js             # browser setup & hooks
├── reports/                 # output cucumber JSON report
├── videos/                  # output video recording
├── Jenkinsfile              # Jenkins CI/CD pipeline
├── cucumber.json            # konfigurasi cucumber
├── generate-report.js       # script generate HTML report
└── package.json
```

---

## Instalasi

```bash
npm install
npx playwright install chromium
```

---

## Cara Run Test

### Run semua test
```bash
npm test
```

### Run berdasarkan tag
```bash
npm run test:positive     # hanya scenario @positive
npm run test:negative     # hanya scenario @negative
npm run test -- --tags @inventory  # hanya scenario @inventory
```

### Generate HTML Report
```bash
npm run report
```

Report tersimpan di `reports/html/index.html`.

---

## Tags

| Tag | Keterangan |
|---|---|
| `@positive` | Scenario login berhasil |
| `@negative` | Scenario login gagal |
| `@inventory` | Scenario halaman produk |

---

## Page Object Model (POM)

Setiap halaman memiliki file tersendiri di folder `pages/`. POM menyimpan:
- **Locator** elemen di constructor
- **Method** untuk aksi dan assertion

Contoh struktur POM:
```js
class LoginPage {
    constructor(page) {
        this.usernameInput = page.locator('#user-name');
    }

    async fillUsername(username) {
        await this.usernameInput.fill(username);
    }
}
```

---

## Fitur

### Video Recording
Setiap test direkam otomatis dan disimpan di folder `videos/`. Dikonfigurasi di `support/world.js`.

### Screenshot Per Step
Screenshot diambil setelah setiap step dan otomatis masuk ke HTML report. Dikonfigurasi menggunakan hook `AfterStep` di `support/world.js`.

---

## CI/CD dengan Jenkins

### Prasyarat
- Jenkins terinstall dan berjalan di `http://localhost:8080`
- Plugin **HTML Publisher** terinstall
- Node.js terinstall di `/usr/local/bin`

### Setup Job
1. Buat **New Item** → pilih **Pipeline**
2. Di bagian **Pipeline**:
   - Definition: `Pipeline script from SCM`
   - SCM: `Git`
   - Repository URL: `https://github.com/Wans999/Playwright.git`
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`
3. Centang **Poll SCM** dengan schedule `H/5 * * * *`
4. Klik **Save**

### Menjalankan Pipeline
- **Build Now** — run semua test
- **Build with Parameters** — pilih tag scenario yang dijalankan

### Melihat Report di Jenkins
Setelah build selesai, klik **Cucumber HTML Report** di sidebar kiri.

### Fix Grafik Report Tidak Muncul
Jalankan script ini di **Manage Jenkins → Script Console**:
```groovy
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")
```

---

## Stages Jenkins Pipeline

| Stage | Keterangan |
|---|---|
| Checkout | Pull code dari GitHub |
| Install Dependencies | `npm install` |
| Install Playwright Browsers | Install Chromium |
| Run Tests | Jalankan Cucumber test |
| Generate Report | Generate HTML report |
| Post | Publish HTML report ke Jenkins |
