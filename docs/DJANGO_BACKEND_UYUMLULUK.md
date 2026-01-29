# Django Backend Uyumluluk Değerlendirmesi

Bu dokümanda mevcut frontend yapısının Django ile gerçek giriş/kayıt ve veri backend’ine geçişe **yapısal olarak uygun** olup olmadığı özetleniyor.

---

## Kısa cevap: **Evet, uygun**

Frontend, arayüzü bozmadan Django (veya herhangi bir REST API) ile değiştirilebilir şekilde kurgulanmış. Yapılacaklar net ve sınırlı.

---

## Şu anki yapı (özet)

| Konu | Durum |
|------|--------|
| **Auth** | `App.tsx` içinde `currentUser` state; `Login` sadece `onLogin(userName, userId)` çağırıyor. Token/session yok. |
| **Veri** | Tüm veri `src/data/mockData.ts` içinde; bileşenler doğrudan import ediyor. |
| **Tipler** | `Category`, `Experience`, `UserData`, `AgendaItem`, `Project` gibi interface’ler `App.tsx`’te tanımlı; API response tipleriyle bire bir eşlenebilir. |
| **Backend** | `backend/` klasöründe minimal Django projesi var; SPA’yı servis ediyor, henüz auth/API yok. |

Bu yapı, “mock’ları API + gerçek auth ile değiştir” mantığına çok uygun.

---

## Neler zaten uyumlu?

1. **Auth akışı**
   - Giriş: form submit → bir callback (`onLogin`) ile kullanıcı bilgisi yukarı iletilir.
   - Çıkış: `setCurrentUser(null)`.
   - Gerçek backend’de: Login’de Django’ya istek atıp token + user döndükten sonra aynı `onLogin(user)` (veya `onLogin(user, token)`) çağrılabilir; UI aynı kalır.

2. **Veri tipleri**
   - `UserData`, `Category`, `Experience` vb. zaten backend modelleriyle uyumlu alanlara sahip.
   - Django REST serializer’larını bu tiplerle eşleştirmek yeterli.

3. **Bileşen yapısı**
   - Dashboard, Agenda, Categories, Profile, CategoryDetail hepsi `currentUser` ve/veya veri listelerini prop veya tek bir kaynaktan alıyor.
   - Veriyi “mockData” yerine “API’den gelen data” ile beslemek için sadece veri kaynağını (örn. React Query, context, API hook’ları) değiştirmeniz yeterli; sayfa tasarımlarını değiştirmeniz gerekmez.

4. **Django projesi**
   - `backend/` zaten var; ileride `django.contrib.auth`, REST framework ve CORS ekleyip aynı projede API ve SPA servisi verebilirsiniz.

Yani **yapısal olarak** site, Django ile backend kodlamaya (giriş/kayıt, kullanıcıya özel veriler) **müsait**.

---

## Backend’e geçerken yapılacaklar (frontend tarafı)

Aşağıdakiler yapıldığında frontend özellikleri korunur; sadece veri ve auth kaynağı değişir.

1. **API katmanı**
   - `src/api/` veya `src/services/` altında:
     - `auth.ts`: login, register, logout, token yenileme (Django’ya istek).
     - `categories.ts`, `experiences.ts`, `agenda.ts`, `profile.ts`: ilgili CRUD istekleri.
   - Tüm `fetch`/`axios` çağrıları burada toplanır; bileşenler sadece bu modülleri kullanır.

2. **Auth state ve token**
   - Token’ı saklamak: `localStorage` veya httpOnly cookie (Django’da session/cookie kullanırsanız).
   - `App.tsx` (veya bir AuthContext):
     - Uygulama açılışında token/session kontrolü.
     - Login: API’den token + user al → `setCurrentUser(user)` (ve token’ı sakla).
     - Logout: token’ı sil + `setCurrentUser(null)`.
   - Mevcut `handleLogin` / `handleLogout` imzaları genişletilerek aynı UI korunur.

3. **Veri kaynağını mock’tan API’ye çevirmek**
   - `mockData.ts` import’ları kaldırılır.
   - Her sayfa/veri tipi için:
     - Veriyi API’den çeken hook veya context kullanılır (örn. `useCategories()`, `useExperiences()`, `useAgendaItems()`).
     - Bileşenler aynı props / aynı veri yapısını kullanmaya devam eder; sadece veri “mock” yerine “api.getCategories()” benzeri bir kaynaktan gelir.

4. **Login / Register formu**
   - `Login.tsx` içinde `handleSubmit`:
     - Şu an: mock kullanıcı listesi veya `user_new`.
     - Sonra: `authApi.login(email, password)` veya `authApi.register(name, email, password)` çağrısı, dönen user/token ile `onLogin(user)` (ve token saklama).
   - Hata mesajları (örn. “E-posta veya şifre hatalı”) aynı form üzerinde gösterilebilir; tasarım aynı kalır.

5. **İsteğe bağlı: React Query / SWR**
   - Kategoriler, deneyimler, ajanda vb. için cache ve yeniden fetch’i kolaylaştırır; yapı yine aynı kalır, sadece veri kaynağı “API + cache” olur.

---

## Backend’e geçerken yapılacaklar (Django tarafı)

- `django.contrib.auth` + isteğe bağlı `djangorestframework` + `djangorestframework-simplejwt` (veya session auth).
- CORS: frontend origin’ine izin.
- API endpoint’leri örnek:
  - `POST /api/auth/login/`, `POST /api/auth/register/`
  - `GET/POST /api/categories/`, `GET/POST /api/experiences/`, `GET/POST /api/agenda-items/`, `GET/POST /api/profile/` vb.
- İsteğe bağlı: React build’i Django static’ten servis etmeye zaten uygunsunuz (`backend` yapısı).

---

## Sonuç

- **Yapı olarak:** Evet, bu site Django ile backend kodlamaya (gerçek kullanıcı girişi, kayıt, kullanıcıya özel veriler) **müsait**.
- **Frontend özellikleri:** Auth ve veri kaynağını “mock” → “Django API + token/session” ile değiştirirken arayüzü ve sayfa yapılarını korumak mümkün; yapılacaklar yukarıdaki adımlarla sınırlı.

İsterseniz bir sonraki adımda `src/api/auth.ts` ve `src/api/client.ts` iskeleti de eklenebilir; böylece ileride sadece base URL ve endpoint’leri doldurmanız yeterli olur.
