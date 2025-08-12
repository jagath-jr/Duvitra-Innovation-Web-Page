// Service data
const servicesData = {
  webdev: {
    title: "Website & Mobile App Development",
    tagline: "Build digital experiences that engage and convert",
    description: "We specialize in creating responsive websites and high-performance mobile applications that deliver exceptional user experiences. Our development process combines cutting-edge technologies with industry best practices to ensure your digital product stands out in today's competitive market.",
    image: "../img/services/webdev.jpg",
    features: [
      "Custom website development",
      "iOS and Android app development",
      "Progressive Web Apps (PWAs)",
      "E-commerce solutions",
      "API development & integration",
      "Performance optimization",
      "Ongoing maintenance & support"
    ]
  },
  uiux: {
    title: "UI/UX & Marketing Materials Design",
    tagline: "Designs that captivate and communicate",
    description: "Our design team creates visually stunning and highly functional user interfaces that enhance user engagement and satisfaction. We also develop compelling marketing materials that effectively communicate your brand message and value proposition.",
    image: "../img/services/uiux.jpg",
    features: [
      "User research & persona development",
      "Wireframing & prototyping",
      "UI/UX design for web and mobile",
      "Brand identity design",
      "Marketing collateral design",
      "Print media design",
      "Design system creation"
    ]
  },
  marketing: {
    title: "Digital Marketing",
    tagline: "Grow your online presence and reach",
    description: "Our comprehensive digital marketing services help you establish a strong online presence, reach your target audience, and convert visitors into customers. We leverage data-driven strategies to maximize your ROI.",
    image: "../img/services/marketing.jpg",
    features: [
      "SEO optimization",
      "Social media marketing",
      "Content marketing",
      "PPC advertising",
      "Email marketing",
      "Analytics & reporting",
      "Conversion rate optimization"
    ]
  },
  software: {
    title: "Custom Software Solutions",
    tagline: "Tailored technology for your unique needs",
    description: "We develop bespoke software solutions designed specifically for your business requirements. Our custom software helps streamline operations, improve efficiency, and provide competitive advantages.",
    image: "../img/services/software.jpg",
    features: [
      "Enterprise software development",
      "Workflow automation",
      "CRM & ERP systems",
      "Database solutions",
      "Cloud integration",
      "Legacy system modernization",
      "Quality assurance testing"
    ]
  },
  chatbot: {
    title: "AI Chatbot Development",
    tagline: "Intelligent automation for better customer engagement",
    description: "We build advanced AI-powered chatbots that enhance customer service, automate responses, and provide 24/7 support. Our chatbots integrate seamlessly with your existing systems.",
    image: "../img/services/chatbot.jpg",
    features: [
      "Natural Language Processing (NLP)",
      "Multi-platform integration",
      "Sentiment analysis",
      "Custom training for industry-specific queries",
      "Analytics dashboard",
      "Voice-enabled interfaces",
      "Continuous learning algorithms"
    ]
  },
  itconsulting: {
    title: "IT Consultancy & Outsourcing",
    tagline: "Expert guidance for your technology needs",
    description: "Our IT consulting services help you make informed technology decisions, while our outsourcing solutions provide access to top-tier talent without the overhead of in-house teams.",
    image: "../img/services/itconsulting.jpg",
    features: [
      "Technology strategy development",
      "Infrastructure planning",
      "Security audits",
      "Managed IT services",
      "Dedicated development teams",
      "Staff augmentation",
      "Ongoing technical support"
    ]
  }
};

// Initialize the page with service data
document.addEventListener('DOMContentLoaded', function() {
  // Get the service parameter from URL
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('service') || 'webdev';
  const service = servicesData[serviceId] || servicesData['webdev'];
  
  // Update the page with service data
  document.getElementById('service-title').textContent = service.title;
  document.getElementById('service-tagline').textContent = service.tagline;
  document.getElementById('service-heading').textContent = service.title;
  document.getElementById('service-full-description').textContent = service.description;
  
  // Set the image
  const serviceImage = document.getElementById('service-main-image');
  if (serviceImage) {
    serviceImage.src = service.image;
    serviceImage.alt = service.title;
  }
  
  // Update features list
  const featuresList = document.getElementById('service-features-list');
  if (featuresList) {
    featuresList.innerHTML = service.features.map(feature => 
      `<li>${feature}</li>`
    ).join('');
  }
  
  // Initialize animations
  initAnimations();
});

// Initialize GSAP animations
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero animation
  gsap.from("#service-hero h1", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out"
  });
  
  gsap.from("#service-hero p", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.2
  });
  
  // Content animations
  gsap.from(".service-description", {
    scrollTrigger: {
      trigger: ".service-description",
      start: "top 80%"
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    ease: "power3.out"
  });
  
  gsap.from(".service-image", {
    scrollTrigger: {
      trigger: ".service-image",
      start: "top 80%"
    },
    duration: 0.8,
    x: 50,
    opacity: 0,
    ease: "power3.out"
  });
  
  gsap.from("#service-features-list li", {
    scrollTrigger: {
      trigger: "#service-features-list",
      start: "top 80%"
    },
    duration: 0.6,
    y: 30,
    opacity: 0,
    stagger: 0.1,
    ease: "power2.out"
  });
  
  gsap.from(".step", {
    scrollTrigger: {
      trigger: ".process-steps",
      start: "top 80%"
    },
    duration: 0.6,
    y: 30,
    opacity: 0,
    stagger: 0.15,
    ease: "power2.out"
  });
}