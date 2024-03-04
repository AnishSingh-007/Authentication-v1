import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginHome from './login/LoginHome';
import Home from './component/Home';
import Logout from './component/Logout';

import { GoogleOAuthProvider } from '@react-oauth/google';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// import Payment from './component/Payment';
// import TestSeries from './component/TestSeries';
// import TestSeriesSingle from './component/TestSeriesSingle';
// import TestseriesList from './component/TestseriesList';
// import TestSeriesUnlock from './component/TestSeriesUnlock';   
// import PaymentButton from './component/PaymentButton';   
// import Instruction from './component/Instruction';      
// import Attempted from './component/Attempted';
// import Solution from './component/Solution';      
// import InstructionNew from './component/InstructionNew';     
// import Checkout from './component/Checkout';     
// import Test from './component/Test';         
// import Index from './admin/Index'
// import Return from './component/Return';
// import Notify from './component/Notify';
             
function App() {    
  return (   
    <>
      <GoogleOAuthProvider clientId="991105793073-1dikvgcrhdiqahsm2056906unah9tpnb.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LoginHome/>}/>      
            <Route exact path="/callback" element={<LoginHome/>}/>
            <Route exact path="/verify-email/:token" element={<LoginHome/>}/>
            <Route exact path="/home" element={<Home/>}/>  
            <Route exact path="/logout" element={<Logout/>}/>  
            {/*
            <Route exact path="/return" element={<Return/>}/>  
            <Route exact path="/notify" element={<Notify/>}/>  
            <Route exact path="/testseries" element={<TestSeries/>}/>  
            <Route exact path="/testseriessingle/:tier_id" element={<TestSeriesSingle/>}/>     
            <Route exact path="/checkout" element={<Checkout/>}/>     
            <Route exact path="/testserieslist/:exam_mode_id/:tier_id" element={<TestseriesList/>}/>  
            <Route exact path="/TestSeriesUnlock/:testid/:exam_post_id/:exam_mode_id" element={<TestSeriesUnlock/>}/>  
            <Route path="/instruction/:exam_mode_id/:papercode/:test_series_id/:test_title" element={<Instruction />} />
            <Route path="/InstructionNew/:exam_mode_id/:papercode/:test_series_id" element={<InstructionNew />} />
            <Route path="/Test/:language/:papercode/:exam_mode_id/:test_series_id/:paperids" element={<Test />} />
            <Route path="/attempted/:exam_mode_id/:paper_code/:test_series_id/:title" element={<Attempted />} />
            <Route path='/Solution/:exam_mode_ids/:papercode/:testseriesid/:testtitle/:SubjectID' element={<Solution />} />   
            <Route path='/paymentbutton' element={<PaymentButton />} />   
            <Route exact path="/admin/*" element={<Index/>}/> 
          */}
          </Routes>                      
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
    
  );    
}

export default App;
