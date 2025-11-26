export const getMappedIndicator = (indicator: string) => {
  const indicatorMap = {
    "Have the ILO Conventions been ratified":
      "Is the country a member state of the ILO?",
    "Is the country a state party to the International Convention on the Elimination of All Forms of Racial Discrimination (ICERD?":
      "Is the country a state party to the International Convention on the Elimination of All Forms of Racial Discrimination (ICERD)?",
    "Has the Convention on the Rights of Persons with Disabilities been ratified?":
      "Is the country a state party to the Convention on the Rights of Persons with Disablities? (CRPD)",
    "Has the Convention on the Elimination of All Forms of Discrimination Against Women been ratified?":
      "Is the country a state party to the Convention on the Elimination of All Forms of Discrimination Against Women? (CEDAW)",
    "Is there a National Human Rights Institution  or its state equivalents in federal settings operating in the country":
      "Is there a National Human Rights Institution  or its state equivalents in federal settings operating in the country",

    "Has the International Covenant on Civil and Political Rights (ICCPR) been ratified?":
      "Is the country a state party to the International Covenant on Civil and Political Rights?",
    "Has the ICESCR been ratified?":
      "Is the country a state party to the International Covenant on Economic Social and Cultural Rights?",
    "Does the constitution, specific laws,  binding legal decisions protect the right to freedom of expression ?":
      "Does the constitution, specific laws, binding legal decisions protect the right to freedom of expression?",
    "Does the constitution, specific laws,  binding legal decisions protect the right to freedom of expression online?":
      "Does the constitution, specific laws, binding legal decisions protect the right to freedom of expression online?",
    "Is there an institution (central or federal equivalent) that oversees access to information requests and handles grievance?":
      "Is there an institution that oversees access to information requests and handles grievances?",
    "Are there domestic provisions (in legislation or the constitution) that protect persons with disabilities against discrimination?":
      "Are there domestic provisions (in legislation or the constitution) that protect persons with disabilities against discrimination?",
    "Are there domestic provisions (in legislation or the constitution) that protects women against discrimination?":
      "Are there domestic provisions (in legislation or the constitution) that protects women against discrimination?",
    "Are there domestic provisions (in legislation or the constitution) that protects minorities or vulnerable groups against discrimination?":
      "Are there domestic provisions (in legislation or the constitution) that protects minorities or vulnerable groups against discrimination?",
    "Is there a law that protects  against hate speech ?":
      "Is there a law that protects against hate speech?",
    "Is there a law or policy that protects against hate speech or discrimination online?":
      "Is there a law or policy that protects against hate speech or discrimination online?",
    "Does the constitution or specific laws, or binding legal decisions protect against arbitrary interference with privacy?":
      "Does the constitution or specific laws, or binding legal decisions protect against arbitrary interference with privacy?",
    "Is there a law that either restricts  government surveillance by intelligence agencies (either a separate law or part of the data protection law)":
      "Is there a law that either restricts government surveillance by intelligence agencies (either a separate law or part of the data protection law)",
  };

  return indicatorMap[indicator as keyof typeof indicatorMap] || indicator;
};

export const getSortedIndicators = (pillar: string, data: any) => {
  const indicatorOrder: any = {
    "Cross-Cutting Indicators": [
      "Connectivity",
      "Digital literacy and skills",
      "Rule of Law",
      "Voice and accountability",
      "Has the International Covenant on Civil and Political Rights (ICCPR) been ratified?",
      "Has the ICESCR been ratified?",
      "Is there a National Human Rights Institution  or its state equivalents in federal settings operating in the country",
    ],
    "Freedom of Expression, Assembly and Association": [
      "What type of content is covered in the legal framework to regulate the Internet?",
      "What is the frequency and duration of internet shutdowns",
      "It is free to file requests for information.",
      "Is there an effective legal framework protecting the freedom of the media and press?",
      "To what extent is content (e.g., news media, social media, messaging apps, VPNs) censored in a country?",
      "Everyone (including non-citizens and legal entities) has the right to file requests for information.",
      "The legal framework (including jurisprudence) recognises a fundamental right of access to information.",
      "There are fee waivers for impecunious requesters for access to information",
      "Does the constitution, specific laws,  binding legal decisions protect the right to freedom of expression ?",
      "Does the constitution, specific laws,  binding legal decisions protect the right to freedom of expression online?",
      "Is there an institution (central or federal equivalent) that oversees access to information requests and handles grievance?",
      "Have the ILO Conventions been ratified",
    ],
    "Right to Privacy": [
      "Does the country have a data protection law?",
      "What does the legal framework to protect Internet users' privacy and their data stipulate?",
      "Does the country have Data Protection Authority or entity with a similar function?",
      "Does the constitution or specific laws, or binding legal decisions protect against arbitrary interference with privacy?",
      "Is there a law that either restricts  government surveillance by intelligence agencies (either a separate law or part of the data protection law)",
    ],
    "Right to Equality and Non-Discrimination": [
      "Has the Convention on the Elimination of All Forms of Discrimination Against Women been ratified?",
      "Is the country a state party to the International Convention on the Elimination of All Forms of Racial Discrimination (ICERD?",
      "Has the Convention on the Rights of Persons with Disabilities been ratified?",
      "Are there domestic provisions (in legislation or the constitution) that protect persons with disabilities against discrimination?",
      "Are there domestic provisions (in legislation or the constitution) that protects women against discrimination?",
      "Are there domestic provisions (in legislation or the constitution) that protects minorities or vulnerable groups against discrimination?",
      "Is there a law or policy that protects against hate speech or discrimination online?",
      "Is there a law that protects  against hate speech ?",
    ],
  };

  const currentIndicator = indicatorOrder[pillar] || [];

  return data.sort((a: any, b: any) => {
    const indexA = currentIndicator.indexOf(a.Indicator);
    const indexB = currentIndicator.indexOf(b.Indicator);

    const safeIndexA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
    const safeIndexB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;

    return safeIndexA - safeIndexB;
  });
};
