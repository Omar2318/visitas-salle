export const verificationEmail = (url: string)=> `

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Confirm your password reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background-color: #E5E5E5;
    }
    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      display: block;
    }
    .container {
      width: 600px;
      max-width: 100%;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #1c398e;
      color: #ffffff;
      padding: 20px 30px;
      text-align: left;
    }
    .header .logo {
      text-align: right;
      height: 40px;
    }
    .main-content {
      padding: 40px 30px;
      color: #000000;
    }
    .button {
      display: inline-block;
      background-color: #1c398e;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 0;
      width: 100%;
      text-align: center;
      border-radius: 7px;
      font-weight: bold;
      font-size: 14px;
    }
    .footer {
      background-color: #1c398e;
      color: #ffffff;
      text-align: center;
      font-size: 11px;
      line-height: 15px;
      padding: 24px 20px;
    }
    @media only screen and (max-width: 595px) {
      .container {
        width: 100% !important;
      }
      .header .logo {
        text-align: center !important;
      }
    }
  </style>
</head>
<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
    <tbody>
      <tr>
        <td align="center">
          <table class="container" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="header">
                  <div class="logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Logo_de_la_Universidad_La_Salle_sin_letras.svg/1200px-Logo_de_la_Universidad_La_Salle_sin_letras.svg.png" width="50" alt="Logo La Salle" />
                  </div>
                </td>
              </tr>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="font-size: 18px; font-weight: bold; padding-bottom: 20px;">
                          ¡Bienvenido!
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; line-height: 150%; padding-bottom: 10px;">
                          Para poder ingresar al sistema de citas de la Universidad La Salle Oaxaca, se requiere que confirmes tu correo.
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; font-weight: 700; padding-bottom: 16px;">
                          Presiona el botón para continuar:
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 24px;">
                          <a href='${url}' class="button" title="Confirmar Correo">Confirmar Correo</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; padding-bottom: 10px;">
                          Este correo de confirmación es válido solo por 24 horas.
                        </td>
                      </tr>
                      <tr>
                        <td style="border-bottom: 1px solid #8B949F; width: 117px; padding-bottom: 16px;"></td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; line-height: 170%; padding-top: 16px;">
                          <strong>Universidad La Salle Oaxaca</strong><br>
                          Carretera a San Agustín #407, Santa Cruz Xoxocotlán
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="footer">
                  ©️ 2025 Universidad La Salle Oaxaca
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>

`;