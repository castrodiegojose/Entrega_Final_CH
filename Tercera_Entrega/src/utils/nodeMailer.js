import {createTransport} from 'nodemailer'
//import {globalVar} from '../options/env.js'


const TEST_MAIL = 'afton.stoltenberg68@ethereal.email'


const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: '6Zn6yBQE2rFq8rDkaa'
    },
    tls:{
        rejectUnauthorized: false
    }
});

const enviarMail = async (user)=>{
    const mailOptions = {
        from: 'Server Node.js',
        to: TEST_MAIL,
        subject:'Usuario Nuevo Registrado',
        html:`<h1> User Information <h/1>
                <ul>
                    <li>User name: ${user.name}</li>
                    <li>Email: ${user.email}</li>
                    <li>Age: ${user.age}</li>
                    <li>Address: ${user.address}</li>
                    <li>Phone Number:${user.phoneNumber}</li>
                </ul>`      
        };

    try {
        const info = await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)        
    }
}

const enviarMailCompra = async (productos, user)=>{

    let pedido = '';

    productos.forEach((producto)=>{
        pedido += `<p>${producto.nombre} -|- $${producto.precio}</p>`
    })
    
    const mailOptions = {
        from: 'Server Node.js',
        to: TEST_MAIL,
        subject:`Pedido del Usuario ${user[0].name}`,
        html:`<h1> User Information <h/1>
                <ul>
                    <li>Nuevo pedido de ${user[0].name}</li>
                    <li>Email: ${user[0].email}</li>
                </ul>` + 
                pedido      
        };

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error)        
    }
}

export {enviarMail, enviarMailCompra}
// const carritoPedido = async (mail, pedido)=>{



// }