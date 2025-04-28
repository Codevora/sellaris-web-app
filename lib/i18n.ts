import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
 en: {
  translation: {
   settings: {
    title: "Settings",
    profile: "Profile",
    system: "System",
    appearance: "Appearance",
    save: "Save",
    change: "Change",
    remove: "Remove",
    name: "Name",
    email: "Email",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    profilePicture: "Profile Picture",
    loadError: "Failed to load settings",
    saveSuccess: "Settings saved successfully",
    saveError: "Failed to save settings",
   },
  },
 },
 id: {
  translation: {
   settings: {
    title: "Pengaturan",
    profile: "Profil",
    system: "Sistem",
    appearance: "Tampilan",
    save: "Simpan",
    change: "Ubah",
    remove: "Hapus",
    name: "Nama",
    email: "Email",
    currentPassword: "Password Sekarang",
    newPassword: "Password Baru",
    confirmPassword: "Konfirmasi Password",
    profilePicture: "Foto Profil",
    loadError: "Gagal memuat pengaturan",
    saveSuccess: "Pengaturan berhasil disimpan",
    saveError: "Gagal menyimpan pengaturan",
   },
  },
 },
};

i18n.use(initReactI18next).init({
 resources,
 lng: "en",
 fallbackLng: "en",
 interpolation: {
  escapeValue: false,
 },
});

export default i18n;
