import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from '../login/login';
//import Inicio from '../index/index';
import PrivateRoute from '../auth/privaterouter';
import Productos from '../productos/iniciop';
//import Comerciante from '../comerciantes/comerciante';
//import Producto from '../productos/producto';

export default function AppRoutes() {

    return (

        <Router>
            <Switch>
                <PrivateRoute exact path={["/productos"]} component={Productos} />
                <Route exact path={["/login"]} component={Login} />
                <Route exact path={["/"]} component={Login} />
                <Route exact path={["/index"]} component={Login} />

                {/*<Route exact path='/' element={<Inicio />} />
                <Route exact path='/index' element={<Inicio />} />
                <Route exact path='/comerciante' element={<Comerciante />} />
                <Route exact path='/producto' element={<Producto />} />
                <Route path='/*' element={(

                    <h1 style={{ marginTop: 300 }}> 404 <br /> Pagina No Encontrada </h1>
                )} />
                {/* <Route exact path='/home' element={<Home />} /> */}

                <Route path={"*"} component={() => (

                    <h1 style={{ marginTop: 300 }}> 404 <br /> Pagina No Encontrada </h1>

                )} />

            </Switch>
        </Router >
    );
}


/*function Home() {

    return (

        <div>
            <h2 style={{ marginTop: 300 }}> Home </h2>
        </div>
    );

}*/
