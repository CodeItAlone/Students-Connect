package com.studentconnect.service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Value("${sendgrid.api.key}")
    private String sendGridApiKey;

    @Value("${sendgrid.from.email}")
    private String fromEmail;

    @Async
    public void sendVerificationEmail(String toEmail, String token) {
        try {
            Email from = new Email(fromEmail);
            String subject = "Verify your Student Connect Account";
            Email to = new Email(toEmail);
            
            // The user requested:
            // "Generate verification URL: http://localhost:8080/api/auth/verify?token=..."
            // "Frontend verification link opens frontend route: /verify-email?token=... Frontend will call backend verify endpoint automatically"
            // So the button link in the email should point to the frontend.
            
            String frontendVerifyUrl = "http://localhost:3000/verify-email?token=" + token;
            
            String htmlContent = "<div style=\"font-family: Arial, sans-serif; text-align: center; padding: 20px;\">"
                    + "<h2>Welcome to Student Connect!</h2>"
                    + "<p>Please click the button below to verify your email address. This link is valid for 15 minutes.</p>"
                    + "<a href=\"" + frontendVerifyUrl + "\" style=\"display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px; margin-top: 15px;\">Verify Email</a>"
                    + "<p style=\"margin-top: 20px;\">Or copy and paste this link in your browser:</p>"
                    + "<p><a href=\"" + frontendVerifyUrl + "\">" + frontendVerifyUrl + "</a></p>"
                    + "</div>";

            Content content = new Content("text/html", htmlContent);
            Mail mail = new Mail(from, subject, to, content);

            SendGrid sg = new SendGrid(sendGridApiKey);
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            
            Response response = sg.api(request);
            logger.info("Email verification sent to {}, Status Code: {}", toEmail, response.getStatusCode());
        } catch (IOException ex) {
            logger.error("Failed to send verification email to {}", toEmail, ex);
        } catch (Exception ex) {
            logger.error("Unexpected error occurred while sending email to {}", toEmail, ex);
        }
    }
}
