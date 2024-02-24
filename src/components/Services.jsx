import './Services.css'
const Services =()=>{
    return(<>
    <div className='kavya'>
    <header>
        <h1>Our Services</h1>
    </header>

    <section class="services">
        <div class="service">
            <img src="service1.jpg" alt="Nutritional Consultation"/>
            <h2>Nutritional Consultation</h2>
            <p>Get personalized nutritional advice from our experienced dietitians. We'll create a custom plan to help you achieve your health and wellness goals.</p>
        </div>

        <div class="service">
            <img src="service2.jpg" alt="Meal Planning"/>
            <h2>Meal Planning</h2>
            <p>Discover the joy of healthy eating with our expertly crafted meal plans. Enjoy delicious and nutritious meals tailored to your dietary preferences and requirements.</p>
        </div>

        <div class="service">
            <img src="service3.jpg" alt="Fitness Guidance"/>
            <h2>Fitness Guidance</h2>
            <p>Combine the power of nutrition with effective fitness strategies. Our fitness experts will guide you on exercises and routines that complement your nutritional journey.</p>
        </div>
    </section>
    </div>
    </>)
}
export default Services