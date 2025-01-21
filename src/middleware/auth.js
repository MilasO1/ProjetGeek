// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
//     const userId = decodedToken.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw "Invalid user ID";
//     } else {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error("Invalid request!"),
//     });
//   }
// };


// middleware.js 
export  function  middleware ( request ) { 
    const {pathname} = request.nextUrl ; // 
    Vérifier si l'utilisateur essaie d'accéder à une route protégée (par exemple, /dashboard) if 
    ( pathname.startsWith ( '/dashboard' )) { const token = request.cookies.get ( ' auth_token' ); // Récupérer le jeton d'authentification à partir des cookies // Si aucun jeton n'est trouvé, rediriger vers la page de connexion if ( ! token) { return Response.redirect ( new URL ( '/login' , request.url ));     }   } // Si l'utilisateur est authentifié, continuer avec la requête return Response.next ( ) ; }
      