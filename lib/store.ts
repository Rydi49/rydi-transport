export interface Submission {
  id: string;
  formType: string;
  data: Record<string, any>;
  submittedAt: string;
}

const submissions: Submission[] = [];

export function addSubmission(submission: Submission) {
  submissions.push(submission);
  if (submissions.length > 500) submissions.shift();
}

export function getSubmissions(): Submission[] {
  return [...submissions].sort((a, b) =>
    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}
