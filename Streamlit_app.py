import streamlit as st

st.set_page_config(page_title="Max's Toolbox", layout="wide")

st.title("Max's Toolbox")
st.write("""
         Hi, this is my personal website, I wanted to create useful tools that I've needed throughout my studies and work and put them all in one place.  \n  \n  This is that place.""")

st.sidebar.title("Navigation")
page = st.sidebar.radio("Go to:", ["Home", "CFA Calculators", "Company Matcher"])

if page == "Home":
    st.header("Welcome!")
    st.write("""
    This is currently in the very earliest of stages. Not even a minimum viable product to be honest. But enjoy! \n
    Use the sidebar to navigate between the different utilities.
    """)

elif page == "CFA Calculators":
    st.header("🧮 CFA Financial Calculators")
    st.write("Here you’ll find tools to automate financial calculations like NPV, CAPM, bond pricing, and more.")
    # Placeholder for calculator code
    st.info("Calculator tools coming soon!")

elif page == "Company Matcher":
    st.header("🏢 Companies House Name Matcher")
    st.write("Tool to match company names to Companies House data and retrieve details.")
    # Placeholder for matcher code
    st.info("Company matcher tool coming soon!")
