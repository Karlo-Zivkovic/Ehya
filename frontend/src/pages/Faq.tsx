import SingleQuestion from '../components/SingleQuestion';
import { questions } from '../utils';

function Faq() {
  return (
    <section className="max-w-xl lg:max-w-2xl xl:max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-center text-2xl uppercase tracking-widest font-bold mb-8">
        Faqs
      </h1>

      <section className="grid grid-cols-1 gap-8">
        {questions.map((question, index) => (
          <SingleQuestion
            question={question.question}
            answer={question.answer}
            key={index}
          />
        ))}
      </section>
    </section>
  );
}

export default Faq;
