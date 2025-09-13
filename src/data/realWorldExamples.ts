import { RealWorldExample } from '../types/attack';

// Sample real-world examples of cyber attacks mapped to MITRE ATT&CK techniques
export const realWorldExamples: RealWorldExample[] = [
  {
    id: 'example-1',
    name: 'SolarWinds Supply Chain Attack',
    description: 'Attackers compromised the software supply chain of SolarWinds Orion and distributed malicious updates to thousands of organizations.',
    techniqueIds: ['T1195', 'T1078', 'T1027', 'T1036'],
    reference: 'https://www.fireeye.com/blog/threat-research/2020/12/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor.html',
    year: 2020
  },
  {
    id: 'example-2',
    name: 'Colonial Pipeline Ransomware Attack',
    description: 'DarkSide ransomware group attacked Colonial Pipeline causing fuel shortages across the US East Coast.',
    techniqueIds: ['T1566', 'T1486', 'T1490', 'T1489'],
    reference: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-131a',
    year: 2021
  },
  {
    id: 'example-3',
    name: 'NotPetya Global Cyberattack',
    description: 'Destructive malware masquerading as ransomware spread globally, causing billions in damages.',
    techniqueIds: ['T1195', 'T1486', 'T1561', 'T1529'],
    reference: 'https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/',
    year: 2017
  }
];
