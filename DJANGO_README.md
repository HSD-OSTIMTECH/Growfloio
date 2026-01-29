# Django ile Çalıştırma (Growfolio)

Frontend **Bootstrap** kullanıyor; **Tailwind kaldırıldı**. Site Django ile tam uyumlu çalışacak şekilde yapılandırıldı.

## 1. Frontend build (React + Vite)

```bash
npm install
npm run build
```

Çıktı: `build/` klasörü (index.html + assets/).

## 2. Django backend

```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
```

## 3. Django ile çalıştırma

Önce proje kökünde `npm run build` çalıştırılmış olmalı (build/ ve build/assets/ dolu).

```bash
cd backend
python manage.py runserver
```

Tarayıcıda: http://127.0.0.1:8000/

- Tüm rotalar aynı `build/index.html` sayfasına yönlendirilir (SPA).
- Statik dosyalar (`/assets/*`) `build/assets/` üzerinden WhiteNoise ile servis edilir.

## 4. Production (örnek)

1. `npm run build`
2. `DJANGO_DEBUG=0 DJANGO_SECRET_KEY=... ALLOWED_HOSTS=yourdomain.com python manage.py collectstatic --noinput`
3. Gunicorn/uWSGI ile `config.wsgi:application` çalıştırın.

## Notlar

- **Bootstrap**: CDN ile yükleniyor (index.html). Django’da kendi static’inizden de servis edebilirsiniz.
- **API**: İleride Django REST Framework ekleyip auth/kategoriler/deneyimler için API yazabilirsiniz; frontend aynı kalır.
