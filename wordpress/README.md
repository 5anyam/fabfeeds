# Fab Feeds — WordPress Plugins

Yeh 2 plugins WordPress admin (`chocolate-zebra-912190.hostingersite.com`) mein install karne hain.
Frontend (Next.js) inhe automatically REST API se read karega — koi frontend code change nahi karna padega jab tum content update karoge.

## Install kaise karein

### Option A — Zip banake upload karna (sabse aasan)
1. `fabfeeds-language-filter` folder ko zip karo → `fabfeeds-language-filter.zip`
2. WordPress admin → **Plugins → Add New → Upload Plugin** → zip select karo → Install → **Activate**
3. Same steps `fabfeeds-banner-manager` folder ke liye repeat karo

### Option B — Hosting file manager / FTP se
1. `wordpress/fabfeeds-language-filter` folder ko `wp-content/plugins/fabfeeds-language-filter/` mein copy karo
2. `wordpress/fabfeeds-banner-manager` folder ko `wp-content/plugins/fabfeeds-banner-manager/` mein copy karo
3. WordPress admin → **Plugins** → dono ko **Activate** karo

---

## 1. Fab Feeds — Language Filter

Kya karta hai:
- Har post ke liye ek **Language** field add karta hai (Posts edit screen ke sidebar mein, Tags jaisa)
- Activate karte hi sab **existing posts** automatically **English** ho jaayenge (jinme language set nahi thi)
- Naya post publish karoge aur language nahi choose karoge → wo bhi automatically **English** ban jayega
- Starter languages already add ki hui hain: **English, Hindi, German, Spanish, French** — aur languages **Posts → Languages** se add kar sakte ho

Use kaise karein:
- Kisi post ko edit karo → right sidebar mein "Languages" box milega → wahan se language select karo (agar German article hai to "German" select karo, warna default English rahega)

Frontend automatically:
- Sabse pehle **English** posts dikhayega (home page, trending, blogs listing sab jagah)
- User jab language switcher se dusri language choose karega, sirf usi language ke posts dikhenge

---

## 2. Fab Feeds — Banner Manager

Kya karta hai:
- Wp-admin mein ek naya **Banners** section add karta hai
- **8 fixed slots** already bane hue hain:
  - Home Banner 1, 2, 3, 4 → home page par
  - Blog Banner 1, 2, 3, 4 → blog article pages par
- Har banner ek square image + ek link hota hai
- Publish karte hi banner **turant live** ho jata hai frontend par, koi code change nahi

Use kaise karein:
1. **Banners → Add New**
2. Title daalo (sirf internal reference ke liye, e.g. "Amazon Sale Banner")
3. Right sidebar mein **Featured Image** set karo — square image use karo (recommended 600×600px ya usse bada)
4. Right sidebar mein **Banner Location** box mein sirf **ek** slot tick karo (jaise "Home Banner 1")
5. Neeche **Banner Settings** box mein **Link URL** daalo — jahan click karne par user jayega
6. **Publish** — banner turant site par dikhne lagega
7. Banner hataana ho (delete kiye bina) → status **Draft** kar do
8. Banner replace karna ho → same banner edit karo, image/link badal do (naya banner mat banao usi slot ke liye)

Agar kisi slot mein banner nahi lagaya, wahan bas khali jagah nahi dikhegi — puri row automatically adjust ho jayegi.
