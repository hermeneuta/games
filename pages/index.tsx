import Form from "../components/Form";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";

const Games = () => {
  return (
    <>
      <div className="bg-indigo-400 pb-10">
        <h1 className="font-serif text-center text-4xl font-bold text-indigo-700 p-6">
          Gry i zabawy
        </h1>
        <Form />
      </div>
      <Footer />
      <Analytics />
    </>
  );
};

export default Games;
