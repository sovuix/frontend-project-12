// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import ErrorPage from './Components/ErrorPage';

// import CardBody from './Components/CardBody/CardBody';
// import SignUpForm from './Components/SignupForm/SignupForm';
// import Button from './Components/Button/Button';
// import Container from './Components/Container/Container';
// import Card from './Components/Card/Card';
// import Logo from './Components/CardLogo/CardLogo';
// import CardForm from './Components/CardForm/CardForm';
// import Header from './Components/Header/Header';
// import CardFooter from './Components/CardFooter/CardFooter';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

//   <div className="h-100 bg-light">
//     <div className="h-100" id="chat">
//       <div className="d-flex flex-column h-100">
//         <Header />
//         <Container>
//           <Card>
//             <CardBody>
//               <Logo />
//               <CardForm>
//                 <SignUpForm>
//                   <Button
//                     text="Войти"
//                     className="w-100 mb-3 btn btn-outline-primary"
//                   />
//                 </SignUpForm>
//               </CardForm>
//             </CardBody>
//             <CardFooter />
//           </Card>
//         </Container>
//       </div>
//     </div>
//   </div>
// );
// }

export default App;
