import './About.css'


const About=()=>{

    return(
    <>
   
        <div className='dhruvam'>
            <section class="hero">
        <h1>Welcome to Our Nutrition Platform</h1>
        <p>Empowering you to achieve a healthier lifestyle through personalized nutrition plans.</p>
    </section>

    <section class="introduction" id="introduction">
        <h2>Who We Are</h2>
        <p>We are a team of dedicated nutritionists and dietitians passionate about helping you achieve your health goals.</p>
    </section>

    <section class="nutritionists" id="nutritionists">
        <h2>Meet Our Nutritionists</h2>
        <div class="nutritionist">
            <img src="nutritionist1.jpg" alt="Nutritionist 1"/>
            <h3>Dr. Emily Johnson</h3>
            <p>Specialized in weight management and sports nutrition.</p>
        </div>
        <div class="nutritionist">
            <img src="nutritionist2.jpg" alt="Nutritionist 2"/>
            <h3>John Rodriguez</h3>
            <p>Experienced in dietary plans for various health conditions.</p>
        </div>
    </section>

    <section class="values" id="values">
        <h2>Our Values</h2>
        <ul>
            <li>Client-Centric Approach</li>
            <li>Evidence-Based Practices</li>
            <li>Continuous Learning and Innovation</li>
            <li>Respect for Individual Choices</li>
        </ul>
    </section>

    <section class="why-choose-us" id="why-choose-us">
        <h2>Why Choose Us</h2>
        <p>At our platform, we provide:</p>
        <ul>
            <li>Personalized Nutrition Plans</li>
            <li>Expert Guidance from Certified Nutritionists</li>
            <li>Regular Follow-ups and Progress Tracking</li>
            <li>Comprehensive Information on Nutrition</li>
        </ul>
    </section>

    <section class="testimonials" id="testimonials">
        <h2>What Our Clients Say</h2>
        <div class="testimonial">
            <blockquote>"I've never felt better! The personalized plan made all the difference."</blockquote>
            <p>- Sarah M.</p>
        </div>
        <div class="testimonial">
            <blockquote>"Knowledgeable and friendly nutritionists. Highly recommended!"</blockquote>
            <p>- Michael D.</p>
        </div>
    </section>
    

    <section class="contact1" id="contact1">
        <h2>Contact Us</h2>
        <p>Have questions or want to get started? Reach out to us!</p>
        <address>
            Email: info@nutritionplatform.com<br/>
            Phone: (123) 456-7890
        </address>
    </section>
        </div>
       
        
        </>
       
    )
}
export default About
