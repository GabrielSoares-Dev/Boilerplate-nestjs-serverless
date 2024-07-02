import { SQSEvent, SNSEvent } from 'aws-lambda';

export const inputSQSNormalizer = <T>(event: SQSEvent): T => {
  const firstRecordIndex = 0;
  const message = event.Records[firstRecordIndex];

  return JSON.parse(message.body);
};

export const inputSNSNormalizer = <T>(event: SNSEvent): T => {
  const firstRecordIndex = 0;

  return JSON.parse(event.Records[firstRecordIndex].Sns.Message);
};
