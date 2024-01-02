import axios from 'axios';

export const API_BASE_URL = 'http://127.0.0.1:9003';
export const RESULTS_PER_PAGE = 4;

export function formatDate(dateString: string, includeHour: boolean = false) {
  const date = new Date(dateString);

  if (includeHour) {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Use 12-hour clock with AM/PM
    }).format(date);

    return formattedDate;
  } else {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);

    return formattedDate;
  }
}

export const questions = [
  {
    question: '1. How do I create a new article?',
    answer:
      "To create a new article, log in to your account, navigate to the dashboard, and click on the 'Add Article' button. Follow the prompts to fill in the title, content, and any additional information. Once you're done, save or publish your article.",
  },
  {
    question: '2. Can I edit my articles after publishing?',
    answer: 'No, be careful what you post, you have the full responsibility.',
  },
  {
    question: '3. How do I add images to my articles?',
    answer:
      'To add images to your articles, use the image insertion tool in the add article modal. You can upload images from your device.',
  },
  {
    question: '4. What formatting options are available for text?',
    answer:
      'As this is simple practice project to showcase ones knowledge, formating options were not implemented',
  },
  {
    question: '5. Can I schedule articles for future publication?',
    answer: 'Scheduling is not available',
  },
  {
    question: '6. What should I do if my article is not displaying properly?',
    answer:
      'If you encounter display issues, make sure images have been properly uploaded. If the problem persists, contact support for assistance.',
  },
];

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.log(error);
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  } else {
    console.log(error);
    throw error;
  }
};

