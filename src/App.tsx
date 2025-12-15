import { useState } from 'react';
import { Instagram, Send } from 'lucide-react';
import { supabase } from './lib/supabase';

interface FormData {
  name: string;
  phone: string;
  governorate: string;
  area: string;
  full_address: string;
  bracelet_style: string;
}

const governorateAreas: Record<string, string[]> = {
  'القاهرة': ['مدينة نصر', 'التجمع الخامس', 'المعادي', 'الزمالك', 'مصر الجديدة', 'شبرا', 'عين شمس', 'حلوان', 'المقطم'],
  'الجيزة': ['الدقي', 'المهندسين', 'فيصل', 'الهرم', 'أكتوبر', 'الشيخ زايد', 'الحوامدية', 'إمبابة'],
  'الإسكندرية': ['محرم بك', 'سيدي جابر', 'سموحة', 'المنتزه', 'العجمي', 'برج العرب', 'الإبراهيمية', 'كرموز']
};

const braceletImages = {
  straight: '/two.jpg',
  curved: '/one.jpg'
};

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    governorate: '',
    area: '',
    full_address: '',
    bracelet_style: ''
  });

  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBracelet, setSelectedBracelet] = useState<'straight' | 'curved' | ''>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'governorate' && { area: '' })
    }));
  };

  const handleBraceletSelect = (style: 'straight' | 'curved') => {
    setSelectedBracelet(style);
    setFormData(prev => ({
      ...prev,
      bracelet_style: style === 'straight' ? 'مستقيم' : 'منحني'
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('orders')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          governorate: formData.governorate,
          area: formData.area,
          full_address: formData.full_address,
          bracelet_style: formData.bracelet_style,
          bracelet_image: braceletImages[selectedBracelet as 'straight' | 'curved']
        }]);

      if (error) throw error;

      setShowPopup(true);
      setFormData({
        name: '',
        phone: '',
        governorate: '',
        area: '',
        full_address: '',
        bracelet_style: ''
      });
      setSelectedBracelet('');

      setTimeout(() => setShowPopup(false), 5000);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E8D5BF] text-[#1a3a52]" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <a
              href="https://www.instagram.com/orzi.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.tiktok.com/@orzi.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>

          <img src="/logo.jpg" alt="1998 Orzi" className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg" />

          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
            1998 Orzi
          </h1>
          <p className="text-xl opacity-90" style={{ fontFamily: 'Cairo, sans-serif' }}>
            أساور فضية بتصاميم مصرية أصيلة
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: 'Cairo, sans-serif' }}>
            اختر التصميم المفضل لك
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div
              onClick={() => handleBraceletSelect('straight')}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
                selectedBracelet === 'straight' ? 'ring-4 ring-[#1a3a52]' : ''
              }`}
            >
              <img src="/two.jpg" alt="أسورة مستقيمة" className="w-full h-80 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  التصميم الأول - مستقيم
                </h3>
                <p className="opacity-75" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  نقوش مصرية تقليدية على سطح مستقيم
                </p>
              </div>
            </div>

            <div
              onClick={() => handleBraceletSelect('curved')}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
                selectedBracelet === 'curved' ? 'ring-4 ring-[#1a3a52]' : ''
              }`}
            >
              <img src="/one.jpg" alt="أسورة منحنية" className="w-full h-80 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  التصميم الثاني - منحني
                </h3>
                <p className="opacity-75" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  نقوش مصرية على سطح منحني أنيق
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'Cairo, sans-serif' }}>
              مواصفات الأسورة
            </h3>
            <div className="grid md:grid-cols-2 gap-6" style={{ fontFamily: 'Cairo, sans-serif' }}>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1a3a52] mt-2"></div>
                <div>
                  <p className="font-bold">المادة:</p>
                  <p className="opacity-75">نحاس أصلي عالي الجودة</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1a3a52] mt-2"></div>
                <div>
                  <p className="font-bold">الطلاء:</p>
                  <p className="opacity-75">نيكل مقاوم للصدأ والتغير اللوني</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1a3a52] mt-2"></div>
                <div>
                  <p className="font-bold">المقاس:</p>
                  <p className="opacity-75">قابل للتعديل ليناسب جميع المقاسات</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1a3a52] mt-2"></div>
                <div>
                  <p className="font-bold">اللون:</p>
                  <p className="opacity-75">فضي لامع</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1a3a52] mt-2"></div>
                <div>
                  <p className="font-bold">الجنس:</p>
                  <p className="opacity-75">مناسب للرجال والنساء</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1a3a52] mt-2"></div>
                <div>
                  <p className="font-bold">المتانة:</p>
                  <p className="opacity-75">مقاوم للتآكل والاستخدام اليومي</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Cairo, sans-serif' }}>
              اطلب أسورتك الآن
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: 'Cairo, sans-serif' }}>
              <div>
                <label className="block font-bold mb-2">الاسم *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#1a3a52]/20 focus:border-[#1a3a52] focus:outline-none transition-colors"
                  placeholder="اكتب اسمك الكامل"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">رقم الهاتف *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#1a3a52]/20 focus:border-[#1a3a52] focus:outline-none transition-colors"
                  placeholder="01xxxxxxxxx"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">المحافظة *</label>
                <select
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#1a3a52]/20 focus:border-[#1a3a52] focus:outline-none transition-colors bg-white"
                >
                  <option value="">اختر المحافظة</option>
                  {Object.keys(governorateAreas).map(gov => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>

              {formData.governorate && (
                <div>
                  <label className="block font-bold mb-2">المنطقة *</label>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#1a3a52]/20 focus:border-[#1a3a52] focus:outline-none transition-colors bg-white"
                  >
                    <option value="">اختر المنطقة</option>
                    {governorateAreas[formData.governorate].map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block font-bold mb-2">العنوان الكامل *</label>
                <textarea
                  name="full_address"
                  value={formData.full_address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#1a3a52]/20 focus:border-[#1a3a52] focus:outline-none transition-colors resize-none"
                  placeholder="اكتب عنوانك بالتفصيل (الشارع، رقم المبنى، الدور، معالم مميزة)"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">اختر التصميم *</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleBraceletSelect('straight')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedBracelet === 'straight'
                        ? 'border-[#1a3a52] bg-[#1a3a52] text-white'
                        : 'border-[#1a3a52]/20 hover:border-[#1a3a52]/50'
                    }`}
                  >
                    مستقيم
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBraceletSelect('curved')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedBracelet === 'curved'
                        ? 'border-[#1a3a52] bg-[#1a3a52] text-white'
                        : 'border-[#1a3a52]/20 hover:border-[#1a3a52]/50'
                    }`}
                  >
                    منحني
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !selectedBracelet}
                className="w-full bg-[#1a3a52] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#1a3a52]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </section>

        <footer className="text-center mt-12 opacity-75" style={{ fontFamily: 'Cairo, sans-serif' }}>
          <p>© 2025 1998 Orzi - جميع الحقوق محفوظة</p>
        </footer>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-[fadeIn_0.3s_ease-in-out]" dir="rtl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-[#1a3a52]" style={{ fontFamily: 'Cairo, sans-serif' }}>
              تم استلام طلبك بنجاح!
            </h3>
            <p className="text-lg text-[#1a3a52]/75" style={{ fontFamily: 'Cairo, sans-serif' }}>
              سنتواصل معك خلال 24 ساعة
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 px-6 py-2 bg-[#1a3a52] text-white rounded-lg hover:bg-[#1a3a52]/90 transition-colors"
              style={{ fontFamily: 'Cairo, sans-serif' }}
            >
              حسناً
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
