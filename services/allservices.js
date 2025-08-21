// Service data
const servicesData = {
  webdev: {
    title: "Website & Mobile App Development",
    tagline: "Build digital experiences that engage and convert",
    description: "We specialize in creating responsive websites and high-performance mobile applications that deliver exceptional user experiences. Our development process combines cutting-edge technologies with industry best practices to ensure your digital product stands out in today's competitive market.",
    lottieSrc: "../SVG/WebsiteDev.json",
    features: [
      "Website & Mobile App Development",
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
    lottieSrc: "../SVG/UIUX Designer.json",
    features: [
      "UI/UX & Marketing Materials Design",
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
    lottieSrc: "../SVG/DigitalMarketing.json",
    features: [
      "Digital Marketing",
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
    lottieSrc: "../SVG/CustomSoftwareSolutions.json",
    features: [
      "Custom Software Solutions",
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
    // image: "../img/services/chatbot.png",
    lottieSrc: "../SVG/chatboat.json",
    features: [
      "AI Chatbot Development",
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
    title: "Data Analytics & Business Intelligence",
    tagline: "Unlock insights and drive smarter decisions",
    description: "Our data analytics and business intelligence services empower you to turn raw data into actionable insights. We help you visualize trends, optimize operations, and make data-driven decisions that accelerate business growth.",
    // image: "../img/services/it_consulting.png",
    lottieSrc: "../SVG/IT_Consultancy.json",
    features: [
      "Data Analytics & Business Intelligence",
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
  const service = servicesData.hasOwnProperty(serviceId) ? servicesData[`${serviceId}`] : servicesData['webdev'];

  // Update the page with service data
  document.getElementById('service-title').textContent = service.title;
  document.getElementById('service-tagline').textContent = service.tagline;
  document.getElementById('service-heading').textContent = service.title;
  document.getElementById('service-full-description').textContent = service.description;

  const serviceImageElement = document.getElementById('service-main-image');
  const lottiePlayer = document.getElementById('service-lottie');

  if (service.image) {
    // If the service has an image defined, show the image and hide the Lottie player
    serviceImageElement.src = service.image;
    serviceImageElement.alt = service.title;
    serviceImageElement.style.display = 'block';
    lottiePlayer.style.display = 'none';
  } else if (service.lottieSrc) {
    // If the service has a Lottie animation defined, show the Lottie player and hide the image
    lottiePlayer.load(service.lottieSrc);
    lottiePlayer.style.display = 'block';
    serviceImageElement.style.display = 'none';
  } else {
    // Handle cases where neither image nor Lottie is defined (optional)
    serviceImageElement.style.display = 'none';
    lottiePlayer.style.display = 'none';
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