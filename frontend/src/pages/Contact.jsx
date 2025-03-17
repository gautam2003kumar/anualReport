import { Mail, Phone, MapPin, Globe } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-green-200 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white p-10 rounded-xl shadow-lg border border-green-300">
        <h2 className="text-4xl font-bold text-green-600 text-center mb-6">Contact Us</h2>
        <p className="text-center text-lg text-gray-600 mb-6">
          We are here to support and serve. Reach out to us for any queries or assistance.
        </p>
        <div className="space-y-5 text-lg">
          <div className="flex items-center gap-4">
            <MapPin className="text-green-500 w-7 h-7" />
            <p className="text-gray-700">268A, Madhopur, Basudeopur, Munger</p>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-green-500 w-7 h-7" />
            <div>
              <p className="text-gray-700">mdayasociety@gmail.com</p>
              <p className="text-gray-700">kumararpan74@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-green-500 w-7 h-7" />
            <div>
              <p className="text-gray-700">7004176432</p>
              <p className="text-gray-700">9431418843</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Globe className="text-green-500 w-7 h-7" />
            <p className="text-gray-700">www.dayafoundation.org</p>
          </div>
          <div className="text-center mt-8">
            <p className="text-xl font-semibold text-gray-800">Arpan Kumar</p>
            <p className="text-gray-600">Secretary, Daya Foundation</p>
          </div>
          <div className="mt-6 text-center text-lg text-gray-700 font-medium">
            <p>Join us in making a difference! Your support helps us reach more lives.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
