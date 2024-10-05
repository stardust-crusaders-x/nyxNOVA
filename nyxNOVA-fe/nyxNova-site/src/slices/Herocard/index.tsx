"use client";

import React from 'react';
import { FaAtom, FaReact, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import Bounded from '@/components/Bounded';

// Styled components without twin.macro
const CardContainer = styled(motion.div)`
  width: 300px;
  height: 400px;
  border-radius: 20px;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(75, 85, 99, 0.5);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.1);
  color: #fbbf24;
  transition: transform 0.3s ease-in-out;
  backdrop-filter: blur(8px);
  &:hover {
    transform: scale(1.05) rotateY(10deg);
  }
`;

const IconWrapper = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: 'font-display'; /* Manually set font-display */
`;

const Content = styled.p`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: #d1d5db;
  font-family: 'font-body'; /* Manually set font-body */
`;

const ServiceData = [
  {
    title: "Universal Rover Navigation",
    content: "300-1500km",
    description: "Plot safe paths across alien terrains, adapting to various planetary conditions",
    icon: <FaMapMarkerAlt />,
  },
  {
    title: "3D Exoplanet Explorer",
    content: "500-1500km",
    description: "Immerse yourself in interactive 3D models of known exoplanets.",
    icon: <FaReact />,
  },
  {
    title: "AI-Powered Surface Analysis",
    content: "300-1500km",
    description: "Detect craters, boulders, and unique features on diverse exoplanets",
    icon: <FaAtom />,
  },
];

const HeroCard: React.FC = () => {
  return (
    <Bounded>
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center">
            {ServiceData.map((data, index) => (
              <CardContainer
                key={index}
                whileHover={{ scale: 1.1, rotateY: 15 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <IconWrapper>{data.icon}</IconWrapper>
                <Title>{data.title}</Title>
                <Content>{data.content}</Content>
                <Description>{data.description}</Description>
              </CardContainer>
            ))}
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default HeroCard;
