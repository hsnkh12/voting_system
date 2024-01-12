import './styles/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screens/Home/Home'
import Signin from './screens/Auth/Signin/Signin'
import Signup from './screens/Auth/Signup/Signup'
import Profile from './screens/Auth/Profile/Profile'
import Elections from './screens/Elections/Elections'
import ElectionDetail from './screens/ElectionDetail/ElectionDetail'
import Candidates from './screens/Candidates/Candidates'
import CandidateDetail from './screens/CandidateDetail/CandidateDetail'
import ScrollToTop from './utils/ScrollToTop'
import Navbar from './sections/Navbar/Navbar';
import { Footer } from './sections/Footer/Footer';
import PhoneNumber from './screens/Auth/PhoneNumber/PhoneNumber';
import PasswordReset from './screens/Auth/PasswordReset/PasswordReset';
import PrivacyPolicy from './screens/PrivacyPolicy/PrivacyPolicy';
import Screen404 from './screens/404/Screen404'
import ChangePassword from './screens/Auth/ChangePassword/ChangePassword';
import NotificationMessage from './components/Notification/NotificationMessage';
import { useEffect, useState } from 'react';
import Results from './screens/Results/Results';

function App() {

  const [notify, setNotify] = useState({ message: null, status: null })

  useEffect(()=>console.log(process.env),[])
  return (
    <div className="App">
      <BrowserRouter>
      <NotificationMessage
          status={notify.status}
          message={notify.message}
          setNotify={setNotify}
        />
        <Navbar></Navbar>
    
        <ScrollToTop></ScrollToTop>
        <Routes>
          <Route path="/" exact element={<Home setPageNotify={setNotify}> </Home>} />
          <Route path="/auth/login" exact element={<Signin setPageNotify={setNotify}></Signin>} />
          <Route path="/auth/register" exact element={<Signup setPageNotify={setNotify}></Signup>} />
          <Route path="/auth/profile" exact element={<Profile setPageNotify={setNotify}></Profile>} />
          <Route path="/elections" exact element={<Elections setPageNotify={setNotify}></Elections>} />
          <Route path="/elections/:election_id" exact element={<ElectionDetail setPageNotify={setNotify}></ElectionDetail>} />
          <Route path="/candidates" exact element={<Candidates setPageNotify={setNotify}></Candidates>} />
          <Route path="/candidates/:candidate_id" exact element={<CandidateDetail setPageNotify={setNotify}></CandidateDetail>} />
          <Route path="/auth/phone-number-verify" exact element={<PhoneNumber setPageNotify={setNotify}></PhoneNumber>} />
          <Route path="/auth/password-reset" exact element={<PasswordReset setPageNotify={setNotify}></PasswordReset>} />
          <Route path="/auth/password-update" exact element={<ChangePassword setPageNotify={setNotify}></ChangePassword>} />
          <Route path="/privacy-policy" exact element={<PrivacyPolicy setPageNotify={setNotify}></PrivacyPolicy>} />
          <Route path="/404" exact element={<Screen404></Screen404>} />
          <Route path="/elections/results/:election_id" exact element={<Results setPageNotify={setNotify}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
