import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import axios from 'axios';
const HomePage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [invoiceData, setInvoiceData] = useState({});

  useEffect(() => {
    async function fetchCustomers() {
      const response = await axios.get('/customers').then((res) => { console.log("res", res); setCustomers(res.data); }).catch((error) => console.log('error', error));
    }
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      async function fetchCustomerData() {
        let postData = {
          customer : selectedCustomer,
        }
        const response = await axios.post(`get-customser-invoice`,postData).then((res) => { console.log("res", res); setInvoiceData(res.data); }).catch((error) => console.log('error', error));
        // setInvoiceData(response.data);
        console.log(invoiceData,"<<<<invoiceData")
      }

      fetchCustomerData();
    }
  }, [selectedCustomer]);

  return (
    <div>
      <h1>{pluginId}&apos; Page</h1>
      <label htmlFor="customer">Select a customer:</label>
      <select
        name="customer"
        id="customer.id"
        value={selectedCustomer}
        onChange={event => setSelectedCustomer(event.target.value)}
      >
        {customers.map(customer => (
          <option key={customer.id} value={customer.id}>
            {customer.name} | {customer.contact_no}
          </option>
        ))}
      </select>

        <p>{selectedCustomer}</p>
        {/* <p>{invoiceData}</p> */}
      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .filter(customer => selectedCustomer === '' || customer.id === selectedCustomer)
            .map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
              </tr>
            ))}
        </tbody>
      </table> */}
    </div>
  );
};


export default memo(HomePage);
