import { Button } from "@/components/ui/button";
import { detailedServices } from "@/lib/constant";  

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional services delivered by verified artisans in your area
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {detailedServices.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <span className="text-blue-600 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="mt-6 w-full text-white py-2 rounded-md  transition-colors">
              Learn More
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a Custom Service?</h2>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for? Contact us for custom service
          requests
        </p>
        <Button className="text-white px-8 py-3 rounded-md transition-colors">
          Contact Us
        </Button>
      </div>
    </div>
  );
};

export default Services;
