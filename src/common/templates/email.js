const verifyEmailBody = (first_name, emailLink) => {
  return `

    <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8 " />
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <!--<![endif]-->
      <meta name="viewport" content="width=device-width, initial-scale =1.0" />
      <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro :400,700,900" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300&display=swap" rel="stylesheet">
      <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
         body, table, td, a, tr, p, h1, h2, h3 {font-family: Open Sans, Helvetica, Arial, sans-serif !important;}
         table {border-collapse: collapse !important;}
      </style>
      <![endif]-->
      <title>
         Email Verification | ezsixty.com
      </title>
   </head>
   <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
   <html style="margin: 0; padding: 0;">
      <body style="margin: 0; padding: 0; background-color: #F7F7F9; color: #241f21; font-family: 'Source Sans Pro', Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 400;">
         <center class="wrapper" style="background-color: #F7F7F9; color: #241f21; font-family: 'Open Sans', sans-serif; font-size: 22px; font-weight: 400;">
            <!--[if mso]>
            <table class="ms-wrapper" width="900" border="0" cellspacing="0" cellpadding="0" style="width:900px">
               <tr>
                  <td align="center">
                     <![endif]-->
                     <table class="main-column" style="margin: 0; padding: 0; border-spacing: 0; font-size: 22px; width: 100%; border-collapse: collapse; max-width: 900px; min-width: 320px;">
                        <tr style="margin: 0; padding: 0;">
                           <td class="content" style="margin: 0; padding: 0; border-collapse: collapse; background-color: #FFFFFF;">
                              <table class="header" style="margin: 0; padding: 0; border-spacing: 0; font-size: 22px; width: 100%; border-collapse: collapse;">
                                 <tr style="margin: 0; padding: 0; ">
                                    <td class="hero" align="center" style="margin: 0; padding: 0; border-collapse: collapse; padding-bottom: 30px; padding-top: 30px;background: #3b3a35; ">
                                       <a href="https://www.ezsixty.com" target="_blank" rel="noopener" style="margin: 0; padding: 0;">
                                       <img src="https://design.ezsixty.com/assets/images/logos/logo-w-lg.png" width="256" style="margin: 0; padding: 0; border: 0 none; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 256px; width: 100%;"></a>
                                    </td>
                                 </tr>
                                 <tr style="margin: 0; padding: 0;">
                                    <td class="description" align ="center" style="margin: 0; padding-left: 75px; padding-right: 75px; border-collapse: collapse; padding-bottom: 10px; padding-top:10px; font-size: 15px; font-weight: 400; color:grey">
                                       Thank you for registering with us, we are thrilled to have you onboard. <br>
                                       We need to verify your primary e-mail address that you have provided during registration.
                                    </td>
                                 </tr>
                              </table>
                              <table style="margin: 0; padding: 0; border-spacing: 0; font-size: 22px; width: 100%; border-collapse: collapse;">
                                 <tr style="margin: 0; padding: 0;">
                                    <td class="feature" style="margin: 0; padding: 10px 100px; border-collapse: collapse;">
                                       <table class="two-column" dir="ltr" style="margin: 0; padding: 0; border-spacing: 0; font-size: 22px; width: 100%; border-collapse: collapse;">
                                          <tr style="margin: 0; padding: 0;">
                                             <td class="column copy" align="center" valign="top" dir="ltr" style="margin: 0; padding: 0; border-collapse: collapse; width: 60%;">
                                                <table style="margin: 0; padding: 0; border-spacing: 0; font-size: 22px; width: 100%; border-collapse: collapse;">
                                                   <tr style="margin: 0; padding: 0;">
                                                      <td class="title" align="center" style="margin: 0; padding-top: 10px;padding-bottom: 5px; border-collapse: collapse; color: #143059;">
                                                         <h2 style="margin: 0; padding: 0; font-size: 20px; font-weight: 600; color: #143059">Your Email Verification Link</h2>
                                                      </td>
                                                   </tr>
                                                   <tr style="margin: 0; padding: 0;">
                                                      <td class="description" align="center" style="margin: 0; padding: 10px; border-collapse: collapse; font-size: 12px; font-weight: 400; color: grey">
                                                         <a href="${emailLink}" target="_blank" rel="noopener" style="margin: 0; padding: 0;">
                                                         <h2 style="margin: 0; padding: 0; font-size: 25px; font-weight: 800; padding-bottom: 30px; color: #143059">Click here!</h2>
                                                         </a>
                                                         <li>If the above link doesn't work, please copy & paste the below address in a browser.</li>
                                                         <li>${emailLink}</li>
                                                         <li>Verification link remains valid for next 2 hours only.</li>
                                                      </td>
                                                   </tr>
                                                </table>
                                             </td>
                                          </tr>
                                       </table>
                                    </td>
                                 </tr>
                              </table>
                           </td>
                        </tr>
                        <tr style="margin: 0; padding: 0;">
                           <td colspan="2" style="font-size:11px; text-align: center; background-color:white; padding:0 10px 0px 20px; line-height:16px;">
                              <p>This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</p>
                           </td>
                        </tr>
                        <tr style="margin: 0; padding: 0;">
                           <td class="footer" style="margin: 0; padding: 40px 115px; border-collapse: collapse; background:#143059; background-color: #3b3a35;">
                              <table role="presentation" class="row" valign="middle" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: left;width: auto">
                                 <tbody>
                                    <tr style="padding: 0;vertical-align: top;text-align: left">
                                       <td width="8" style="word-wrap: break-word;-webkit--moz-border-collapse: collapse !important;padding: 0;vertical-align: top;text-align: left;color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;Margin: 0;line-height: 20px;font-size: 14px;padding-right: 8px">
                                          <a href="https://www.facebook.com/ezsixty" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block">
                                          <img height="16" width="8" src="https://design.ezsixty.com/assets/images/logos/social-facebook.png" alt="Facebook" title="Facebook" class="social-facebook" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;width: 8px;max-width: 100%;clear: none;display: inline;border: none;height: 16px"></a>
                                       </td>
                                       <td width="16" style="word-wrap: break-word;-webkit--moz-hyphens:auto;border-collapse: collapse !important;padding: 0;vertical-align: top;text-align: left;color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;Margin: 0;line-height: 20px;font-size: 14px;padding-right: 8px">
                                          <a href="https://www.twitter.com/easysixty" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block">
                                          <img height="16" width="16" src="https://design.ezsixty.com/assets/images/logos/social-twitter.png" alt="Twitter" title="Twitter" class="social-icon" style="outline: none;text-decoration:none;-ms-interpolation-mode: bicubic;width: 16px;max-width: 100%;clear: none;display: inline;border: none;height: 16px"></a>
                                       </td>
                                       <td width="16" style="word-wrap: break-word;-webkit--moz-border-collapse: collapse !important;padding: 0;vertical-align: top;text-align: left;color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;Margin: 0;line-height: 20px;font-size: 14px;padding-right: 8px">
                                          <a href="https://www.instagram.com/ez.sixty" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block">
                                          <img height="16" width="16" src="https://design.ezsixty.com/assets/images/logos/social-instagram.png" alt="Instagram" title="Instagram" class="social-icon" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;width: 16px;max-width: 100%;clear: none;display: inline;border: none;height: 16px"></a>
                                       </td>
                                       <td width="16" style="word-wrap: break-word;-webkit--moz-border-collapse: collapse !important;padding: 0;vertical-align: top;text-align: left;color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;Margin: 0;line-height: 20px;font-size: 14px;padding-right: 8px">
                                          <a href="https://www.linkedin.com/company/tiki-interactive" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI,Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block">
                                          <img height="16" width="16" src="https://design.ezsixty.com/assets/images/logos/social-linkedin.png" alt="LinkedIn" title="LinkedIn" class="social-icon" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;width: 16px;max-width: 100%;clear: none;display: inline;border: none;height: 16px"></a>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>                              
                              <table role="presentation" class="row" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: left;width:auto;position: relative;display: table">
                                 <tbody>
                                    <tr style="padding: 0;vertical-align: top;text-align: left">
                                       <th style="color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;font-size: 14px">
                                          <p style="Margin: 0;color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica, Neue, Arial, sans-serif;font-weight: 400;padding: 0;text-align: left;line-height: 16px;font-size: 12px;Margin-bottom: 0px !important;word-wrap: normal">
                                             <a href="https://www.ezsixty.com/privacy" title="Privacy Statement" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block;">Privacy Statement</a> 
                                          </p>
                                          <p style="Margin: 0;color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;text-align: left;line-height: 16px;font-size: 12px;Margin-bottom: 12px;word-wrap: normal;-webkit-text-size-adjust: none;Margin-top: 8px">
                                             TIKI Interactive Inc, <br>
                                             <span style="display: inline-block;word-break: keep-all">
                                             16192 Coastal Highway, Lewes, Delaware 19958.
                                             </span>
                                          </p>
                                          <a href="https://www.ezsixty.com/" title="Visit ezsixty.com">
                                          <img height="31" width="94" src="https://design.ezsixty.com/assets/images/logos/logo-w.png" alt="ezsixty" title="EZSIXTY" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;width: 94px;max-width: 100%;clear: both;display: block;height: 31px">
                                          </a>
                                       </th>
                                       <th style="color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0 !important;Margin: 0px;text-align: left;line-height: 20px;font-size: 14px;visibility: hidden;width: 0">
                                       </th>
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                     </table>
                     <!--[if mso]>
                  </td>
               </tr>
            </table>
            <![endif]-->
         </center>
      </body>
   </html>
</html>
`;
};

const resetEmailBody = (emailLink) => {
  return `
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml">
     <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8 " />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale =1.0" />
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro :400,700,900" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300&display=swap" rel="stylesheet">
        <!--[if (gte mso 9)|(IE)]>
        <style type="text/css">
           body, table, td, a, tr, p, h1, h2, h3 {font-family: Open Sans, Helvetica, Arial, sans-serif !important;}
           table {border-collapse: collapse !important;}
        </style>
        <![endif]-->
        <title>
           Reset Password | ezsixty.com
        </title>
     </head>
     <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
     <html style="margin: 0; padding: 0;">
        <body style="margin: 0; padding: 0; background-color: #F7F7F9; color: #241f21; font-family: 'Source Sans Pro', Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 400;">
           <center class="wrapper" style="background-color: #F7F7F9; color: #241f21; font-family: 'Open Sans', sans-serif; font-size: 22px; font-weight: 400;">
              <!--[if mso]>
              <table class="ms-wrapper" width="900" border="0" cellspacing="0" cellpadding="0" style="width:900px">
                 <tr>
                    <td align="center">
                       <![endif]-->
                       <table class="main-column" style="margin: 0; padding: 0; border-spacing: 0; font-size: 22px; width: 100%; border-collapse: collapse; max-width: 900px; min-width: 320px;">
                          <tr style="margin: 0; padding: 0;">
                             <td class="content" style="margin: 0; padding: 0; border-collapse: collapse; background-color: #FFFFFF;">
                                <table class="header" style="margin: 0; padding: 0; border-spacing: 0; font-size: 22px; width: 100%; border-collapse: collapse;">
                                   <tr style="margin: 0; padding: 0; ">
                                      <td class="hero" align="center" style="margin: 0; padding: 0; border-collapse: collapse; padding-bottom: 30px; padding-top: 30px;background: #3b3a35; ">
                                         <a href="https://www.ezsixty.com" target="_blank" rel="noopener" style="margin: 0; padding: 0;">
                                         <img src="https://design.ezsixty.com/assets/images/logos/logo-w-lg.png" width="256" style="margin: 0; padding: 0; border: 0 none; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 256px; width: 100%;"></a>
                                      </td>
                                   </tr>
                                   <tr style="margin: 0; padding: 0;">
                                      <td class="description" align ="center" style="margin: 0; padding-left: 75px; padding-right: 75px; border-collapse: collapse; padding-bottom: 10px; padding-top:10px; font-size: 15px; font-weight: 400; color:grey">
                                         Hello, this is an automated response to your recent password assistance request. <br>
                                         Please follow the below link to reset your password. <br>If you have not requested this, you can safely ignore this e-mail.
                                      </td>
                                   </tr>
                                </table>
                                <table style="margin: 0; padding: 0; border-spacing: 0; font-size: 22px; width: 100%; border-collapse: collapse;">
                                   <tr style="margin: 0; padding: 0;">
                                      <td class="feature" style="margin: 0; padding: 10px 100px; border-collapse: collapse;">
                                         <table class="two-column" dir="ltr" style="margin: 0; padding: 0; border-spacing: 0; font-size: 22px; width: 100%; border-collapse: collapse;">
                                            <tr style="margin: 0; padding: 0;">
                                               <td class="column copy" align="center" valign="top" dir="ltr" style="margin: 0; padding: 0; border-collapse: collapse; width: 60%;">
                                                  <table style="margin: 0; padding: 0; border-spacing: 0; font-size: 22px; width: 100%; border-collapse: collapse;">
                                                     <tr style="margin: 0; padding: 0;">
                                                        <td class="title" align="center" style="margin: 0; padding-top: 10px;padding-bottom: 5px; border-collapse: collapse; color: #143059;">
                                                           <h2 style="margin: 0; padding: 0; font-size: 20px; font-weight: 600; color: #143059">Password Reset Link</h2>
                                                        </td>
                                                     </tr>
                                                     <tr style="margin: 0; padding: 0;">
                                                        <td class="description" align="center" style="margin: 0; padding: 10px; border-collapse: collapse; font-size: 12px; font-weight: 400; color: grey">
                                                           <a href="${emailLink}" target="_blank" rel="noopener" style="margin: 0; padding: 0;">
                                                           <h2 style="margin: 0; padding: 0; font-size: 25px; font-weight: 800; padding-bottom: 30px; color: #143059">Click here!</h2>
                                                           </a>
                                                           <li>If the above link doesn't work, please copy & paste the below address in a browser.</li>
                                                           <li>${emailLink}</li>
                                                           <li>Verification link remains valid for next 2 hours only.</li>
                                                        </td>
                                                     </tr>
                                                  </table>
                                               </td>
                                            </tr>
                                         </table>
                                      </td>
                                   </tr>
                                </table>
                             </td>
                          </tr>
                          <tr style="margin: 0; padding: 0;">
                             <td colspan="2" style="font-size:11px; text-align: center; background-color:white; padding:0 10px 0px 20px; line-height:16px;">
                                <p>This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</p>
                             </td>
                          </tr>
                          <tr style="margin: 0; padding: 0;">
                             <td class="footer" style="margin: 0; padding: 40px 115px; border-collapse: collapse; background:#143059; background-color: #3b3a35;">
                                <table role="presentation" class="row" valign="middle" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: left;width: auto">
                                   <tbody>
                                      <tr style="padding: 0;vertical-align: top;text-align: left">
                                         <td width="8" style="word-wrap: break-word;-webkit--moz-border-collapse: collapse !important;padding: 0;vertical-align: top;text-align: left;color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;Margin: 0;line-height: 20px;font-size: 14px;padding-right: 8px">
                                            <a href="https://www.facebook.com/ezsixty" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block">
                                            <img height="16" width="8" src="https://design.ezsixty.com/assets/images/logos/social-facebook.png" alt="Facebook" title="Facebook" class="social-facebook" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;width: 8px;max-width: 100%;clear: none;display: inline;border: none;height: 16px"></a>
                                         </td>
                                         <td width="16" style="word-wrap: break-word;-webkit--moz-hyphens:auto;border-collapse: collapse !important;padding: 0;vertical-align: top;text-align: left;color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;Margin: 0;line-height: 20px;font-size: 14px;padding-right: 8px">
                                            <a href="https://www.twitter.com/easysixty" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block">
                                            <img height="16" width="16" src="https://design.ezsixty.com/assets/images/logos/social-twitter.png" alt="Twitter" title="Twitter" class="social-icon" style="outline: none;text-decoration:none;-ms-interpolation-mode: bicubic;width: 16px;max-width: 100%;clear: none;display: inline;border: none;height: 16px"></a>
                                         </td>
                                         <td width="16" style="word-wrap: break-word;-webkit--moz-border-collapse: collapse !important;padding: 0;vertical-align: top;text-align: left;color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;Margin: 0;line-height: 20px;font-size: 14px;padding-right: 8px">
                                            <a href="https://www.instagram.com/ez.sixty" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block">
                                            <img height="16" width="16" src="https://design.ezsixty.com/assets/images/logos/social-instagram.png" alt="Instagram" title="Instagram" class="social-icon" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;width: 16px;max-width: 100%;clear: none;display: inline;border: none;height: 16px"></a>
                                         </td>
                                         <td width="16" style="word-wrap: break-word;-webkit--moz-border-collapse: collapse !important;padding: 0;vertical-align: top;text-align: left;color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;Margin: 0;line-height: 20px;font-size: 14px;padding-right: 8px">
                                            <a href="https://www.linkedin.com/company/tiki-interactive" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI,Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block">
                                            <img height="16" width="16" src="https://design.ezsixty.com/assets/images/logos/social-linkedin.png" alt="LinkedIn" title="LinkedIn" class="social-icon" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;width: 16px;max-width: 100%;clear: none;display: inline;border: none;height: 16px"></a>
                                         </td>
                                      </tr>
                                   </tbody>
                                </table>                              
                                <table role="presentation" class="row" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: left;width:auto;position: relative;display: table">
                                   <tbody>
                                      <tr style="padding: 0;vertical-align: top;text-align: left">
                                         <th style="color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;font-size: 14px">
                                            <p style="Margin: 0;color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica, Neue, Arial, sans-serif;font-weight: 400;padding: 0;text-align: left;line-height: 16px;font-size: 12px;Margin-bottom: 0px !important;word-wrap: normal">
                                               <a href="https://www.ezsixty.com/privacy" title="Privacy Statement" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block;">Privacy Statement</a> 
                                            </p>
                                            <p style="Margin: 0;color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;text-align: left;line-height: 16px;font-size: 12px;Margin-bottom: 12px;word-wrap: normal;-webkit-text-size-adjust: none;Margin-top: 8px">
                                               TIKI Interactive Inc, <br>
                                               <span style="display: inline-block;word-break: keep-all">
                                               16192 Coastal Highway, Lewes, Delaware 19958.
                                               </span>
                                            </p>
                                            <a href="https://www.ezsixty.com/" title="Visit ezsixty.com">
                                            <img height="31" width="94" src="https://design.ezsixty.com/assets/images/logos/logo-w.png" alt="ezsixty" title="EZSIXTY" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;width: 94px;max-width: 100%;clear: both;display: block;height: 31px">
                                            </a>
                                         </th>
                                         <th style="color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0 !important;Margin: 0px;text-align: left;line-height: 20px;font-size: 14px;visibility: hidden;width: 0">
                                         </th>
                                      </tr>
                                   </tbody>
                                </table>
                             </td>
                          </tr>
                       </table>
                       <!--[if mso]>
                    </td>
                 </tr>
              </table>
              <![endif]-->
           </center>
        </body>
     </html>
  </html>
 
    `;
};

const changePasswordEmailBody = () => {
  return `
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml">
     <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8 " />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale =1.0" />
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro :400,700,900" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300&display=swap" rel="stylesheet">
        <!--[if (gte mso 9)|(IE)]>
        <style type="text/css">
           body, table, td, a, tr, p, h1, h2, h3 {font-family: Open Sans, Helvetica, Arial, sans-serif !important;}
           table {border-collapse: collapse !important;}
        </style>
        <![endif]-->
        <title>
           Attention: Password Changed | ezsixty.com
        </title>
     </head>
     <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
     <html style="margin: 0; padding: 0;">
        <body style="margin: 0; padding: 0; background-color: #F7F7F9; color: #241f21; font-family: 'Source Sans Pro', Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 400;">
           <center class="wrapper" style="background-color: #F7F7F9; color: #241f21; font-family: 'Open Sans', sans-serif; font-size: 22px; font-weight: 400;">
              <!--[if mso]>
              <table class="ms-wrapper" width="900" border="0" cellspacing="0" cellpadding="0" style="width:900px">
                 <tr>
                    <td align="center">
                       <![endif]-->
                       <table class="main-column" style="margin: 0; padding: 0; border-spacing: 0; font-size: 22px; width: 100%; border-collapse: collapse; max-width: 900px; min-width: 320px;">
                          <tr style="margin: 0; padding: 0;">
                             <td class="content" style="margin: 0; padding: 0; border-collapse: collapse; background-color: #FFFFFF;">
                                <table class="header" style="margin: 0; padding: 0; border-spacing: 0; font-size: 22px; width: 100%; border-collapse: collapse;">
                                   <tr style="margin: 0; padding: 0; ">
                                      <td class="hero" align="center" style="margin: 0; padding: 0; border-collapse: collapse; padding-bottom: 30px; padding-top: 30px;background: #3b3a35; ">
                                         <a href="https://www.ezsixty.com" target="_blank" rel="noopener" style="margin: 0; padding: 0;">
                                         <img src="https://design.ezsixty.com/assets/images/logos/logo-w-lg.png" width="256" style="margin: 0; padding: 0; border: 0 none; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 256px; width: 100%;"></a>
                                      </td>
                                   </tr>
                                   <tr style="margin: 0; padding: 0;">
                                      <td class="feature" style="margin: 0; padding: 10px 100px; border-collapse: collapse;">
                                         <table class="two-column" dir="ltr" style="margin: 0; padding: 0; border-spacing: 0; font-size: 22px; width: 100%; border-collapse: collapse;">
                                            <tr style="margin: 0; padding: 0;">
                                               <td class="column copy" align="center" valign="top" dir="ltr" style="margin: 0; padding: 0; border-collapse: collapse; width: 60%;">
                                                  <table style="margin: 0; padding: 0; border-spacing: 0; font-size: 22px; width: 100%; border-collapse: collapse;">
                                                     <tr style="margin: 0; padding: 0;">
                                                        <td class="title" align="center" style="margin: 0; padding-top: 10px;padding-bottom: 5px; border-collapse: collapse; color: #143059;">
                                                           <h2 style="margin: 0; padding: 0; font-size: 20px; font-weight: 600; color: #143059">Your Password Changed Successfully!</h2>
                                                        </td>
                                                     </tr>
                                                  </table>
                                               </td>
                                            </tr>
                                         </table>
                                      </td>
                                   </tr>
                                   <tr style="margin: 0; padding: 0;">
                                      <td class="description" align ="center" style="margin: 0; padding-left: 75px; padding-right: 75px; border-collapse: collapse; padding-bottom: 10px; padding-top:10px; font-size: 15px; font-weight: 400; color:grey">
                                         Hello, this is an automated response to your recent password change at ezsixty.com. <br>
                                         <br>You can ignore this message, if it was you are aware of this change. <br>Otherwise please reset your password by visiting ezsixty.com.
                                         <br> Please reach out to support@ezsixty.com for further assistance, if needed.
                                      </td>
                                   </tr>
                                </table>
  
                             </td>
                          </tr>
                          <tr style="margin: 0; padding: 0;">
                             <td colspan="2" style="font-size:11px; text-align: center; background-color:white; padding:0 10px 0px 20px; line-height:16px;">
                                <p>This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</p>
                             </td>
                          </tr>
                          <tr style="margin: 0; padding: 0;">
                             <td class="footer" style="margin: 0; padding: 40px 115px; border-collapse: collapse; background:#143059; background-color: #3b3a35;">
                                <table role="presentation" class="row" valign="middle" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: left;width: auto">
                                   <tbody>
                                      <tr style="padding: 0;vertical-align: top;text-align: left">
                                         <td width="8" style="word-wrap: break-word;-webkit--moz-border-collapse: collapse !important;padding: 0;vertical-align: top;text-align: left;color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;Margin: 0;line-height: 20px;font-size: 14px;padding-right: 8px">
                                            <a href="https://www.facebook.com/ezsixty" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block">
                                            <img height="16" width="8" src="https://design.ezsixty.com/assets/images/logos/social-facebook.png" alt="Facebook" title="Facebook" class="social-facebook" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;width: 8px;max-width: 100%;clear: none;display: inline;border: none;height: 16px"></a>
                                         </td>
                                         <td width="16" style="word-wrap: break-word;-webkit--moz-hyphens:auto;border-collapse: collapse !important;padding: 0;vertical-align: top;text-align: left;color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;Margin: 0;line-height: 20px;font-size: 14px;padding-right: 8px">
                                            <a href="https://www.twitter.com/easysixty" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block">
                                            <img height="16" width="16" src="https://design.ezsixty.com/assets/images/logos/social-twitter.png" alt="Twitter" title="Twitter" class="social-icon" style="outline: none;text-decoration:none;-ms-interpolation-mode: bicubic;width: 16px;max-width: 100%;clear: none;display: inline;border: none;height: 16px"></a>
                                         </td>
                                         <td width="16" style="word-wrap: break-word;-webkit--moz-border-collapse: collapse !important;padding: 0;vertical-align: top;text-align: left;color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;Margin: 0;line-height: 20px;font-size: 14px;padding-right: 8px">
                                            <a href="https://www.instagram.com/ez.sixty" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block">
                                            <img height="16" width="16" src="https://design.ezsixty.com/assets/images/logos/social-instagram.png" alt="Instagram" title="Instagram" class="social-icon" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;width: 16px;max-width: 100%;clear: none;display: inline;border: none;height: 16px"></a>
                                         </td>
                                         <td width="16" style="word-wrap: break-word;-webkit--moz-border-collapse: collapse !important;padding: 0;vertical-align: top;text-align: left;color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;Margin: 0;line-height: 20px;font-size: 14px;padding-right: 8px">
                                            <a href="https://www.linkedin.com/company/tiki-interactive" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI,Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block">
                                            <img height="16" width="16" src="https://design.ezsixty.com/assets/images/logos/social-linkedin.png" alt="LinkedIn" title="LinkedIn" class="social-icon" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;width: 16px;max-width: 100%;clear: none;display: inline;border: none;height: 16px"></a>
                                         </td>
                                      </tr>
                                   </tbody>
                                </table>                              
                                <table role="presentation" class="row" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: left;width:auto;position: relative;display: table">
                                   <tbody>
                                      <tr style="padding: 0;vertical-align: top;text-align: left">
                                         <th style="color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;font-size: 14px">
                                            <p style="Margin: 0;color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica, Neue, Arial, sans-serif;font-weight: 400;padding: 0;text-align: left;line-height: 16px;font-size: 12px;Margin-bottom: 0px !important;word-wrap: normal">
                                               <a href="https://www.ezsixty.com/privacy" title="Privacy Statement" style="color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;Margin: 0;text-align: left;line-height: 20px;text-decoration: underline;display: inline-block;">Privacy Statement</a> 
                                            </p>
                                            <p style="Margin: 0;color: #6a6a6a;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0;text-align: left;line-height: 16px;font-size: 12px;Margin-bottom: 12px;word-wrap: normal;-webkit-text-size-adjust: none;Margin-top: 8px">
                                               TIKI Interactive Inc, <br>
                                               <span style="display: inline-block;word-break: keep-all">
                                               16192 Coastal Highway, Lewes, Delaware 19958.
                                               </span>
                                            </p>
                                            <a href="https://www.ezsixty.com/" title="Visit ezsixty.com">
                                            <img height="31" width="94" src="https://design.ezsixty.com/assets/images/logos/logo-w.png" alt="ezsixty" title="EZSIXTY" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;width: 94px;max-width: 100%;clear: both;display: block;height: 31px">
                                            </a>
                                         </th>
                                         <th style="color: #1a1a1f;font-family: Segoe UI, SegoeUI, Roboto, Helvetica Neue, Arial, sans-serif;font-weight: 400;padding: 0 !important;Margin: 0px;text-align: left;line-height: 20px;font-size: 14px;visibility: hidden;width: 0">
                                         </th>
                                      </tr>
                                   </tbody>
                                </table>
                             </td>
                          </tr>
                       </table>
                       <!--[if mso]>
                    </td>
                 </tr>
              </table>
              <![endif]-->
           </center>
        </body>
     </html>
  </html>
  
    `;
};

module.exports = { verifyEmailBody, resetEmailBody, changePasswordEmailBody };
