import { Mail, Phone, MapPin, Globe } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-5xl bg-white p-12 rounded-2xl shadow-xl">
        <h2 className="text-5xl font-bold text-blue-600 text-center mb-8">Contact Us</h2>
        <p className="text-center text-xl text-gray-600 mb-8">We are here to support and serve. Reach out to us for any queries or assistance.</p>
        <div className="space-y-6 text-lg">
          <div className="flex items-center gap-6">
            <MapPin className="text-blue-500 w-8 h-8" />
            <p className="text-gray-700">268A, Madhopur, Basudeopur, Munger</p>
          </div>
          <div className="flex items-center gap-6">
            <Mail className="text-blue-500 w-8 h-8" />
            <div>
              <p className="text-gray-700">mdayasociety@gmail.com</p>
              <p className="text-gray-700">kumararpan74@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Phone className="text-blue-500 w-8 h-8" />
            <div>
              <p className="text-gray-700">7004176432</p>
              <p className="text-gray-700">9431418843</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Globe className="text-blue-500 w-8 h-8" />
            <p className="text-gray-700">www.dayafoundation.org</p>
          </div>
          <div className="text-center mt-10">
            <p className="text-2xl font-semibold text-gray-800">Arpan Kumar</p>
            <p className="text-gray-600">Secretary, Daya Foundation</p>
          </div>
          <div className="mt-8 text-center text-lg text-gray-700 font-medium">
            <p>Join us in making a difference! Your support helps us reach more lives.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Contact };
