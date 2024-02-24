import './Contact.css'
const Contact=()=>{
    return(
        <>
        <div className='harshil'>
        <section class="pal">
        <div class="contact-info">
            <h2>Our Contact Information</h2>
            <p>You can reach us through the following channels:</p>

            <div class="info">
                <div class="icon">
                    <img src="phone-icon.png" alt="Phone Icon"/>
                </div>
                <p>Phone: <a href="tel:+123456789">+1 (234) 567-89</a></p>
            </div>

            <div class="info">
                <div class="icon">
                    <img src="email-icon.png" alt="Email Icon"/>
                </div>
                <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
            </div>
        </div>

        <div class="contact-form">
            <h2>Contact Form</h2>
            <form action="#" method="post">
                <label for="name">Your Name:</label>
                <input type="text" id="name" name="name" required/>

                <label for="email">Your Email:</label>
                <input type="email" id="email" name="email" required/>

                <label for="message">Your Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>

                <button type="submit">Send Message</button>
            </form>
        </div>
    </section>
            
        

        </div>
        </>
    )
}
export default Contact;