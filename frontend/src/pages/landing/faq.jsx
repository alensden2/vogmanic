import ExpandMoreIcon from "@mui/icons-material/Close";
import CloseIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { useState } from "react";
import resale from "../../assets/Resale.jpeg";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

const faqData = [
    {
        category: "Order Issues",
        questions: [
            {
                question: "What payment methods do you accept?",
                answer: "We accept various payment methods, including credit cards (Visa, Mastercard, American Express), debit cards, and PayPal.",
            },
            {
                question: "Can I cancel or modify my order after it has been placed?",
                answer: "Yes, you can cancel or modify your order if it hasn't been processed or shipped yet. Please contact our customer support as soon as possible to request any changes or cancellations.",
            },
            {
                question: "Are there any special discounts for first-time customers?",
                answer: "Yes, we offer special discounts for first-time customers. You may find exclusive offers and promotions on our website or through our newsletter. Make sure to check for any available discounts during the checkout process.",
            },
            {
                question: "Do you have a loyalty program for frequent shoppers?",
                answer: "Yes, we have a loyalty program for our frequent shoppers. As a loyal customer, you can earn points with each purchase and redeem them for discounts or other rewards. Please check our website or contact customer support for more details on our loyalty program.",
            },
            {
                question: "How can I check the status of my order?",
                answer: "You can easily check the status of your order by logging into your account on our website. Once logged in, navigate to the 'Orders' or 'Order History' section, where you'll find the details of your recent orders along with their current status.",
            },
            {
                question: "What should I do if I haven't received my order confirmation email?",
                answer: "If you haven't received your order confirmation email, please check your spam or junk folder in your email inbox. In case you still can't find it, please contact our customer support, and they will assist you in ensuring you receive the necessary order confirmation details.",
            },
            {
                question: "Can I make changes to my shipping address after placing an order?",
                answer: "If you need to make changes to your shipping address after placing an order, please contact our customer support immediately. They will assist you in updating the shipping address if it's still possible before the order is shipped.",
            },
            {
                question: "What should I do if I accidentally placed a duplicate order?",
                answer: "If you accidentally placed a duplicate order, please reach out to our customer support as soon as possible. They will help you cancel the duplicate order and provide any necessary assistance to ensure a smooth shopping experience.",
            },
            {
                question: "How do I apply a coupon code to my order?",
                answer: "During the checkout process, you'll find a field labeled 'Coupon Code' or 'Promo Code' where you can enter the code you have. Enter the coupon code in the designated field and click on the 'Apply' button. The discount associated with the coupon code will be applied to your order if it meets the terms and conditions of the coupon.",
            },
        ],
    },
    {
        category: "Delivery",
        questions: [
            {
                question: "How can I track my order?",
                answer: "To track your order, log in to your account on our website and navigate to the 'Orders' or 'Order History' section. There, you'll find information about your order, including the tracking number and a link to the carrier's website for real-time tracking updates.",
            },
            {
                question: "How long does it take to receive my order?",
                answer: "The delivery time depends on your location and the shipping method you choose during checkout. Typically, orders are delivered within 3-5 business days, but please allow for additional time for international or remote locations.",
            },
            {
                question: "Do you offer international shipping?",
                answer: "Yes, we offer international shipping to select countries. During the checkout process, you can enter your shipping address to see if we ship to your location. Please note that additional customs fees or import duties may apply depending on your country's regulations.",
            },
            {
                question: "Are there any additional costs for shipping or taxes?",
                answer: "Shipping costs are calculated based on the weight and dimensions of the items in your order, as well as your location. Taxes and duties may apply depending on your country's regulations and are not included in the item prices or shipping costs displayed at checkout.",
            },
            {
                question: "What shipping carriers do you use?",
                answer: "We work with reputable shipping carriers such as FedEx, UPS, and DHL to ensure reliable and efficient delivery of your orders. The specific carrier used for your shipment depends on various factors, including your location and the items in your order.",
            },
            {
                question: "How long does it take to process and ship an order?",
                answer: "After placing an order, it typically takes 1-2 business days to process and ship the items. During peak seasons or promotional periods, processing times may be slightly longer. Once your order is shipped, you'll receive a confirmation email with tracking information.",
            },
            {
                question: "Can I request expedited shipping for my order?",
                answer: "Yes, we offer expedited shipping options for urgent orders. During the checkout process, you can select the expedited shipping method that best suits your needs. Please note that additional shipping fees may apply for expedited shipping.",
            },
            {
                question: "What should I do if my package is lost or stolen?",
                answer: "If you believe your package is lost or stolen, please contact our customer support immediately. We will work with the shipping carrier to track your package or initiate a claim if necessary. Your satisfaction is our top priority, and we'll assist you in resolving any delivery issues.",
            },
            {
                question: "Do you offer free shipping on all orders?",
                answer: "We offer free shipping on orders that meet certain criteria, such as a minimum order value or specific promotions. During the checkout process, you'll be able to see if your order qualifies for free shipping. If not, the shipping costs will be calculated based on the items and shipping address.",
            },
        ],
    },
    {
        category: "Return and Refund",
        questions: [
            {
                question: "What is your return/exchange policy?",
                answer: "Our return/exchange policy allows you to return or exchange items within 30 days of purchase, as long as they are in their original condition with tags attached. Please review our detailed return policy on our website for more information on eligibility and the return process.",
            },
            {
                question: "How can I initiate a return or exchange?",
                answer: "To initiate a return or exchange, please contact our customer support and provide them with your order details. They will guide you through the return process and provide you with a return shipping label if applicable. Please note that certain items, such as personalized or final sale items, may not be eligible for return or exchange.",
            },
            {
                question: "How long does it take to process a return and receive a refund?",
                answer: "Once we receive your returned items, it typically takes 3-5 business days to process the return and issue a refund. The refund will be credited back to the original payment method used for the purchase. Please note that the time it takes for the refund to reflect on your account may vary depending on your bank or payment provider.",
            },
            {
                question: "Do I need to pay for return shipping?",
                answer: "If you are returning an item due to our error or a defective product, we will provide a prepaid return shipping label. However, if you are returning an item for personal reasons or a change of mind, you may be responsible for the return shipping costs. Please review our return policy or contact customer support for more details.",
            },
            {
                question: "What should I do if I receive a damaged or defective item?",
                answer: "If you receive a damaged or defective item, please contact our customer support immediately with your order details and a description or photos of the issue. We will assist you in resolving the issue by providing a replacement, refund, or any necessary support to ensure your satisfaction.",
            },
            {
                question: "Can I return or exchange an item purchased during a sale or promotion?",
                answer: "Yes, you can return or exchange an item purchased during a sale or promotion, as long as it meets our return/exchange policy requirements. However, please note that the refund amount may be adjusted to reflect any discounts or promotions applied to the original purchase.",
            },
        ],
    },
];

const Faq = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedQuestion, setExpandedQuestion] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleQuestionClick = (question) => {
        if (expandedQuestion === question) {
            setExpandedQuestion("");
        } else {
            setExpandedQuestion(question);
        }
    };

    const filterQuestions = (questions) => {
        if (searchTerm === "") {
            return questions;
        } else {
            return questions.filter((q) =>
                q.question.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    };

    return (
        <>
            <Navbar />
            <Box sx={{ backgroundImage: `url(${resale})`, backgroundColor: "#f8f8f8", pt: 8, pb: 4, padding: "100px" }}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ color: "#333", fontWeight: "bold", mb: 4 }}
                >
                    Frequently Asked Questions
                </Typography>
                <Box
                    sx={{
                        maxWidth: 800,
                        mx: "auto",
                        px: 2,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Paper
                        component="form"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flex: 1,
                            borderRadius: "999px",
                            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <IconButton sx={{ p: 1 }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            placeholder="Search questions"
                            inputProps={{ "aria-label": "search questions" }}
                            sx={{ ml: 1, flex: 1 }}
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Paper>
                </Box>
            </Box>
            <Box sx={{ maxWidth: 800, mx: "auto", px: 2, pb: 8, marginTop: "20px" }}>
                {faqData.map((category, index) => (
                    <Box key={index} sx={{ mt: index !== 0 ? 6 : 0 }}>
                        <Typography variant="h6" sx={{ color: "#333", fontWeight: "bold" }}>
                            {category.category}
                        </Typography>
                        {filterQuestions(category.questions).map((question, index) => (
                            <Box
                                key={index}
                                sx={{
                                    py: 2,
                                    borderBottom: "1px solid #ddd",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleQuestionClick(question.question)}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{ color: "#555", flex: 1 }}>
                                        {question.question}
                                    </Typography>
                                    {expandedQuestion === question.question ? (
                                        <ExpandMoreIcon sx={{ color: "#888" }} />
                                    ) : (
                                        <CloseIcon sx={{ color: "#888" }} />
                                    )}
                                </Box>
                                {expandedQuestion === question.question && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body1">{question.answer}</Typography>
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
            <Footer />
        </>
    );
};

export default Faq;


// reference - for layout https://us.shein.com/faq/index
/**
 * paper - https://mui.com/material-ui/react-paper/
 * image// reference https://www.pexels.com/ --for all the stock images
 */