# Growfolio — Kullanıcı Gelişim Platformu

React (Vite) + Bootstrap ile geliştirilmiş bir kullanıcı gelişim platformu. Şu an örnek hesaplarla giriş yapılmaktadır; proje yapısı Django backend ile gerçek kullanıcı giriş/kayıt sistemine geçişe uygundur.

---

## İçindekiler

1. [Gereksinimler](#gereksinimler)
2. [Frontend’i çalıştırma](#frontendi-çalıştırma)
3. [Build (production) çıktısı](#build-production-çıktısı)
4. [Django backend’i çalıştırma](#django-backendi-çalıştırma)
5. [Django backend önerileri](#django-backend-önerileri)
6. [Backend’e geçiş — adım adım](#backende-geçiş--adım-adım)
7. [Ortam değişkenleri](#ortam-değişkenleri)
8. [Sorun giderme](#sorun-giderme)

---

## Gereksinimler

| Araç        | Açıklama                          |
|------------|------------------------------------|
| **Node.js** | v18+ (npm ile birlikte gelir)     |
| **npm**     | Bağımlılıklar ve frontend çalıştırma |
| **Python**  | 3.10+ (Django backend için)       |
| **pip**     | Python paket yöneticisi           |

Kontrol için:

```bash
node -v    # v18.x veya üzeri
npm -v
python -V  # Python 3.10+
```

---

## Frontend’i çalıştırma

Frontend tek başına (backend olmadan) çalışır; giriş ekranında örnek hesaplar kullanılır.

### 1. Bağımlılıkları yükle

Proje kökünde:

```bash
npm install
```

### 2. Geliştirme sunucusunu başlat

```bash
npm run dev
```

- Vite sunucusu varsayılan olarak **http://localhost:3000** adresinde açılır.
- Tarayıcı otomatik açılmıyorsa bu adresi manuel girin.
- Değişiklik yaptıkça sayfa otomatik yenilenir (HMR).

### 3. Örnek giriş hesapları

Giriş ekranında aşağıdaki e‑posta adreslerinden biriyle giriş yapabilirsiniz (şifre alanı mock’ta kontrol edilmez):

| E-posta            | İsim         |
|--------------------|-------------|
| ayse@example.com   | Ayşe Yılmaz |
| mehmet@example.com | Mehmet Kaya |
| zeynep@example.com | Zeynep Demir|
| can@example.com    | Can Özkan   |

---

## Build (production) çıktısı

Frontend’i statik dosya olarak derlemek için:

```bash
npm run build
```

- Çıktı **`build/`** klasörüne yazılır (Vite `outDir: 'build'`).
- Django, production’da bu klasörü kullanarak SPA’yı sunar; build çıktısının adı (`build`) proje içinde bu şekilde kullanılmak üzere ayarlanmıştır.

---

## Django backend’i çalıştırma

Backend, React build’ini sunacak ve ileride API endpoint’leri ekleyecek şekilde yapılandırılmıştır.

### 1. Sanal ortam (önerilir)

```bash
cd backend
python -m venv venv
```

**Windows (PowerShell):**

```powershell
.\venv\Scripts\Activate.ps1
```

**Windows (CMD):**

```cmd
venv\Scripts\activate.bat
```

**macOS/Linux:**

```bash
source venv/bin/activate
```

### 2. Python bağımlılıklarını yükle

```bash
pip install -r requirements.txt
```

`requirements.txt` içeriği: `Django>=4.2,<5`, `whitenoise>=6.6`.

### 3. Frontend build’inin varlığı

Django, React uygulamasını **proje kökündeki `build/`** klasöründen okur. Önce frontend’i build’leyin:

```bash
# Proje kökünde
npm run build
```

`build/` ve içinde `index.html`, `assets/` vb. oluşmalıdır.

### 4. Django sunucusunu başlat

```bash
# backend/ içinde, venv aktifken
python manage.py runserver
```

- Varsayılan adres: **http://127.0.0.1:8000**
- Bu adreste SPA (React uygulaması) sunulur; tüm rota istekleri `index.html` ile eşleşir, routing React Router’da yapılır.

### 5. Sadece API için backend (frontend ayrı portta)

Frontend’i `npm run dev` (port 3000) ile çalıştırıp backend’i sadece API için kullanacaksanız:

- Backend’i `http://127.0.0.1:8000` adresinde çalıştırın.
- Frontend’te `.env` ile `VITE_API_URL=http://127.0.0.1:8000/api` tanımlayın (CORS’u backend’te açmanız gerekir; aşağıda anlatılıyor).

---

## Django backend önerileri

### Genel mimari

- **Frontend:** React SPA (Bootstrap), `src/api/` altında API istemcisi ve auth fonksiyonları.
- **Backend:** Django; önce statik SPA sunumu, sonra REST API (giriş, kayıt, profil vb.).

### 1. REST API

- **Django REST Framework (DRF)** kullanmanız önerilir: serializers, viewset’ler, kimlik doğrulama ve izinler için uygundur.
- Alternatif: Django’nun `JsonResponse` ve view’ları ile basit JSON endpoint’leri (küçük projeler için yeterli).

### 2. Kimlik doğrulama (Auth)

- **JWT (JSON Web Token):** Stateless, mobil/SPA için uygun. Örn. `djangorestframework-simplejwt`.
- **Session + cookie:** Django session backend’i; tarayıcı tabanlı SPA’da `SameSite`, CORS ve cookie ayarlarına dikkat edin.
- Mevcut frontend `Authorization: Bearer <token>` ve `localStorage` kullanacak şekilde yazıldığı için JWT ile uyumludur.

### 3. CORS

Frontend farklı bir portta (örn. 3000) çalışırken backend’e (örn. 8000) istek atacaksa CORS açılmalıdır:

```bash
pip install django-cors-headers
```

`settings.py` içinde:

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # en üste
    ...
]
# Geliştirme için:
CORS_ALLOWED_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000']
# veya sadece dev için:
# CORS_ALLOW_ALL_ORIGINS = True
```

### 4. Önerilen uygulama yapısı

- **`backend/config/`** — Ayarlar, ana `urls.py`.
- **`backend/accounts/`** (veya `users/`) — Kullanıcı modeli (isteğe bağlı özel), login/register/refresh endpoint’leri, profil.
- **`backend/api/`** — İsteğe bağlı; diğer API modülleri (kategoriler, ajanda vb.) için.

### 5. API endpoint isimlendirmesi

Frontend şu path’leri kullanacak şekilde hazır:

- `POST /api/auth/login/` — Giriş (e‑posta + şifre).
- `POST /api/auth/register/` — Kayıt (ad, e‑posta, şifre).

Django’da ana `urls.py` içinde `/api/` prefix’i ile bu path’leri yönlendirmeniz yeterli; örn. `path('api/', include('accounts.urls'))`.

### 6. Güvenlik

- Production’da `DEBUG = False`, `SECRET_KEY` ve `ALLOWED_HOSTS` ortam değişkeninden gelmeli.
- HTTPS kullanın; JWT’yi mümkünse kısa ömürlü access token + refresh token ile kullanın.
- Şifreler Django’nun varsayılan password hashing’i ile saklanmalı (default zaten güvenli).

---

## Backend’e geçiş — adım adım

Aşağıdaki adımlar, mevcut frontend’i bozmadan gerçek Django auth’a bağlamanız için tasarlanmıştır.

### Adım 1: Django’da bir auth uygulaması oluşturma

```bash
cd backend
python manage.py startapp accounts
```

`config/settings.py` içinde:

```python
INSTALLED_APPS = [
    'django.contrib.staticfiles',
    'corsheaders',   # CORS için ekleyin
    'rest_framework', # DRF kullanacaksanız
    'accounts',
    'frontend',
]
```

Gerekirse:

```bash
pip install djangorestframework djangorestframework-simplejwt django-cors-headers
pip freeze > requirements.txt
```

### Adım 2: Kullanıcı modeli

Django’nun varsayılan `User` modeli çoğu senaryo için yeterlidir. Özel alan gerekirse `AbstractUser` ile genişletebilirsiniz; bu durumda `AUTH_USER_MODEL = 'accounts.User'` tanımlanır ve ilk migration’dan önce yapılmalıdır.

### Adım 3: Login / Register endpoint’leri

Frontend’in beklediği yanıt örneği:

**Login** `POST /api/auth/login/`  
Body: `{ "email": "...", "password": "..." }`  
Yanıt: `{ "user": { "id": "...", "name": "...", "email": "..." }, "token": "..." }`

**Register** `POST /api/auth/register/`  
Body: `{ "name": "...", "email": "...", "password": "..." }`  
Yanıt: Aynı yapı (user + token).

- DRF kullanıyorsanız: `rest_framework_simplejwt.views.TokenObtainPairView` benzeri bir view’ı login için kullanıp yanıtı `user` + `token` formatına map edebilirsiniz; veya custom view yazıp JWT üretirsiniz.
- Basit tutmak için: Django’nun `authenticate()` ve `login()` (session için) veya sadece `authenticate()` + manuel JWT üretip JSON dönebilirsiniz.

Örnek URL yapısı (`config/urls.py`):

```python
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/auth/', include('accounts.urls')),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'), name='spa'),
]
if settings.DEBUG and settings.STATICFILES_DIRS:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
```

`accounts/urls.py` örneği:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view),
    path('register/', views.register_view),
]
```

View’larda: gelen JSON’ı okuyun, login’de `authenticate()` + JWT, register’da kullanıcı oluşturup JWT dönün; yanıtı `{ "user": {...}, "token": "..." }` formatında verin.

### Adım 4: CORS (geliştirme için)

Frontend `http://localhost:3000` iken API’ye istek atacaksa `config/settings.py` içinde `django-cors-headers` ekleyip `CORS_ALLOWED_ORIGINS` veya (sadece dev için) `CORS_ALLOW_ALL_ORIGINS = True` kullanın.

### Adım 5: Frontend’te API base URL

Proje kökünde `.env` dosyası oluşturun:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Backend farklı host/portta ise buna göre değiştirin. `src/api/client.ts` zaten `import.meta.env.VITE_API_URL || '/api'` kullanıyor; böylece istekler Django’daki `/api/` altına gider.

### Adım 6: Login sayfasında mock’u kaldırma

`src/components/Login.tsx` içinde form gönderimini (submit handler) gerçek API’ye bağlayın:

- `handleSubmit` içinde mock kullanıcı listesi ve `onLogin(userName, userId)` manuel çağrıları yerine:
  - Giriş: `import { login } from '@/api';` (veya `from '../api'`) ile `login(email, password)` çağrısı yapın; dönen `user` ve `token` ile state’i güncelleyip `onLogin(user.name, String(user.id))` benzeri bir çağrı yapın.
  - Kayıt: `register(name, email, password)` kullanın; aynı şekilde yanıtla state’i güncelleyip giriş yapılmış gibi devam edin.
- Hata durumunda (yanlış şifre, e‑posta kullanımda vb.) backend’den gelen mesajı kullanıcıya gösterin.

Bu sayede mevcut sayfa tasarımı ve Bootstrap yapısı aynen kalır; sadece veri kaynağı mock’tan Django API’ye geçer.

### Adım 7: Korunan sayfalar ve token

- Zaten `localStorage`’da token saklanıyor (`auth.ts`). Korunan sayfalarda (örn. Dashboard, Profil) sayfa yüklenirken `getStoredToken()` veya `getToken()` ile kontrol yapıp yoksa login sayfasına yönlendirin.
- API istekleri `client.ts` üzerinden gittiği sürece `Authorization: Bearer <token>` otomatik eklenir; backend’de JWT doğrulaması yapmanız yeterli.

---

## Ortam değişkenleri

| Değişken (Frontend) | Açıklama | Örnek |
|---------------------|----------|--------|
| `VITE_API_URL`      | API base URL (trailing slash olmadan) | `http://127.0.0.1:8000/api` |

| Değişken (Backend)  | Açıklama | Örnek |
|----------------------|----------|--------|
| `DJANGO_SECRET_KEY`  | Django secret key | Uzun rastgele string |
| `DJANGO_DEBUG`       | 1 = debug, 0 = production | `1` |
| `ALLOWED_HOSTS`      | Virgülle ayrılmış hostlar | `localhost,127.0.0.1` |

---

## Sorun giderme

- **Frontend açılmıyor / npm run dev hata veriyor:** `npm install` tekrar çalıştırın; Node sürümünün 18+ olduğundan emin olun.
- **Django “Template Does Not Exist”:** Önce proje kökünde `npm run build` yapın; `build/index.html` ve `build/assets/` oluşmalı. Django `REACT_BUILD_DIR = BASE_DIR.parent / 'build'` ile bu klasörü kullanır.
- **API istekleri 404:** Django `urls.py` içinde `path('api/auth/', include('accounts.urls'))` tanımlı mı, `runserver` doğru portta mı kontrol edin.
- **CORS hatası:** Backend’te `django-cors-headers` kurulu ve `CORS_ALLOWED_ORIGINS` (veya dev için `CORS_ALLOW_ALL_ORIGINS`) ayarını yaptığınızdan emin olun; frontend’in çalıştığı origin (örn. `http://localhost:3000`) listede olmalı.
- **Token gönderilmiyor:** `src/api/client.ts` zaten `localStorage.getItem('token')` ile header ekliyor; login/register sonrası yanıttaki `token`’ı `localStorage.setItem('token', ...)` ile kaydettiğinizden emin olun.

---

Bu README, projeyi hem sadece frontend hem de Django ile birlikte çalıştırmanız ve ileride backend’e geçişiniz için tek referans olacak şekilde hazırlanmıştır. Backend’e geçişte frontend özellikleri korunur; yalnızca veri kaynağı mock’tan Django API’ye taşınır.
