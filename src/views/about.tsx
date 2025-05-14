import Container from "@/components/container";

const About = () => {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4 text-lg">
        We are a one-stop platform connecting you with trusted, skilled artisans across Nigeria. Whether you need a reliable plumber, an experienced electrician, a talented tailor, or a professional cleaner — we make it easy to find, book, and receive quality service right at your doorstep.
      </p>
      <p className="mb-4 text-lg">
        Our mission is to empower local artisans by giving them visibility and access to more customers, while also ensuring households and businesses can quickly access verified and affordable help when they need it.
      </p>
      <p className="mb-4 text-lg">
        With services ranging from home repairs and renovations to beauty, grooming, and technical support, our platform ensures that all your day-to-day needs are covered — conveniently, safely, and professionally.
      </p>
      <p className="mb-4 text-lg">
        We believe in community growth, skill development, and customer satisfaction. That’s why we vet every service provider and continually strive to improve the way Nigerians access artisan services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">What We Offer</h2>
      <ul className="list-disc list-inside text-lg space-y-2">
        <li>Wide range of verified artisan services</li>
        <li>Easy booking and responsive support</li>
        <li>24/7 emergency service availability</li>
        <li>Support for local talent and small businesses</li>
        <li>Fair pricing and transparent processes</li>
      </ul>
    </Container>
  );
};

export default About;

