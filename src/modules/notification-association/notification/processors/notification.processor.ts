import { Job } from 'bull';
import { ExpoSDKAtapter } from '../adapters/expo-adapter';
import { FCMAdapter } from '../adapters/fcm-adapter';
import { INotificationJobData } from '../interfaces/notification-job-data.interface';
import { SendNotificationService } from '../services/send-notification.service';

const sendNotificationService = new SendNotificationService(new ExpoSDKAtapter(), new FCMAdapter());

export default async function notificationProcessor(job: Job<INotificationJobData>) {
    return sendNotificationService.execute(job.data.tokens, job.data.data);
}
