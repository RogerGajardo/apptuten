import React from 'react';

import { Apiurl } from '../services/api';
import axios from 'axios';

import Header from '../template/Header.js'
import DataTable from 'react-data-table-component'

import '../assetss/css/lista.css';

class Editar extends React.Component {

    state = {
        bookings: [],
        bookingsFilter: [],
        busqueda: '',
        email: 'contacto@tuten.cl',
        err: false,
        errMsg: ""
    }

    columnas = [
        {
            name: 'BookingId',
            selector: 'bookingId',
            sortable: true
        },
        {
            name: 'Cliente',
            selector: row => row.locationId.tutenUser.firstName + " " + row.locationId.tutenUser.lastName ,
            sortable: true
        },
        {
            name: 'Fecha de Creación',
            selector: 'bookingTime',
            sortable: true
        },
        {
            name: 'Dirección',
            selector: 'locationId.streetAddress',
            sortable: true
        },
        {
            name: 'Precio',
            selector: 'bookingPrice',
            sortable: true,
        }
    ];

    paginacion = {
        rowsPerPageText: 'Filas por Pagina',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    onChange = async e => {
        e.persist();
        await this.setState({ busqueda: e.target.value.toLowerCase() });
        this.filtrarElementos();
    }

    filtrarElementos = () => {
        let search = this.state.bookings.filter(item => {
            if (item.bookingId.toString().includes(this.state.busqueda) ||
                item.locationId.tutenUser.firstName.toLowerCase().includes(this.state.busqueda) ||
                item.locationId.tutenUser.lastName.toLowerCase().includes(this.state.busqueda) ||
                item.bookingTime.toString().includes(this.state.busqueda) ||
                item.locationId.streetAddress.toLowerCase().includes(this.state.busqueda) ||
                item.bookingPrice.toString().includes(this.state.busqueda)) {
                return item;
            }
        });
        this.setState({ bookingsFilter: search });
    }


    componentDidMount() {
        let url = `${Apiurl}user/${this.state.email}/bookings`;
        axios.get(url, { 
            params: {
                current:true
            },
            headers: {
                "Content-Type": "application/json",
                "adminemail": localStorage.email,
                "token": localStorage.token,
                "app": localStorage.app
            }
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    bookings: response.data,
                    bookingsFilter: response.data
                })
            }).catch(error => {
                this.setState({
                    err: true,
                    errMsg: "Error"
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <Header></Header>
                <div className="table-responsive">

                    <div className="barraBusqueda">
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="textField"
                            name="busqueda"
                            value={this.state.busqueda}
                            onChange={this.onChange} />
                    </div>

                    <DataTable
                        title="bookings"
                        columns={this.columnas}
                        data={this.state.bookingsFilter}
                        pagination
                        paginationComponentOptions={this.paginacion}
                        fixedHeader
                        fixedHeaderScrollHeight="600px" />
                </div>
            </React.Fragment >
        );
    }
}

export default Editar;