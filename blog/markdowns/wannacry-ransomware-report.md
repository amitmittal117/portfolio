## Introduction

The WannaCry ransomware attack, which occurred in May 2017, was one of the most widespread and damaging cyberattacks in history. This report examines how WannaCry works and outlines the steps a forensic specialist can take to analyze it.

## How WannaCry Works

1. **Initial Infection**: WannaCry primarily spreads through an exploit called EternalBlue, which targets a vulnerability in Microsoft's Server Message Block (SMB) protocol.
2. **Propagation**: Once a system is infected, WannaCry scans for other vulnerable systems on the network and spreads to them automatically.
3. **Encryption**: The ransomware encrypts files on the infected system using a combination of RSA and AES encryption algorithms.
4. **Ransom Demand**: After encryption, WannaCry displays a ransom note demanding payment in Bitcoin to decrypt the files.
5. **Kill Switch**: The original version of WannaCry included a "kill switch" domain, which, when registered, could stop the spread of the malware.

## Forensic Analysis of WannaCry

A forensic specialist can follow these steps to analyze a WannaCry infection:

1. **Isolate the System**: Disconnect the infected system from the network to prevent further spread.
2. **Create Disk Image**: Make a forensic copy of the infected system's hard drive for analysis.
3. **Analyze System Artifacts**:
   - Check Windows event logs for evidence of the initial infection and subsequent activities.
   - Examine file system artifacts, focusing on recently created or modified files.
   - Analyze memory dumps for traces of the ransomware's execution.
4. **Investigate Network Traffic**:
   - Look for signs of the EternalBlue exploit in network logs.
   - Identify attempts to connect to the kill switch domain.
   - Detect outbound connections to Bitcoin wallets or command and control servers.
5. **Malware Analysis**:
   - Perform static analysis of the ransomware executable to understand its structure and capabilities.
   - Conduct dynamic analysis in a controlled environment to observe the malware's behavior.
6. **Encryption Analysis**:
   - Identify encrypted files and analyze their structure.
   - Attempt to recover encryption keys or shadow copies of files.
7. **Timeline reconstruction**:
   - Create a chronological timeline of the attack, from initial infection to file encryption.

## Conclusion

Understanding how WannaCry operates and knowing how to analyze it forensically is crucial for cybersecurity professionals. This knowledge can help in developing better defenses against similar attacks and in potentially recovering data from infected systems.

## References

1. Symantec Security Response. (2017). What you need to know about the WannaCry Ransomware. [https://symantec-enterprise-blogs.security.com/blogs/threat-intelligence/wannacry-ransomware-attack](https://symantec-enterprise-blogs.security.com/blogs/threat-intelligence/wannacry-ransomware-attack)
2. MalwareTech. (2017). How to Accidentally Stop a Global Cyber Attacks. [https://www.malwaretech.com/2017/05/how-to-accidentally-stop-a-global-cyber-attacks.html](https://www.malwaretech.com/2017/05/how-to-accidentally-stop-a-global-cyber-attacks.html)
3. Microsoft. (2017). Microsoft Security Bulletin MS17-010. [https://docs.microsoft.com/en-us/security-updates/securitybulletins/2017/ms17-010](https://docs.microsoft.com/en-us/security-updates/securitybulletins/2017/ms17-010)
4. Kaspersky Lab. (2017). WannaCry Ransomware: What You Need to Know. [https://www.kaspersky.com/resource-center/threats/ransomware-wannacry](https://www.kaspersky.com/resource-center/threats/ransomware-wannacry)
5. SANS Institute. (2017). SANS Digital Forensics and Incident Response Blog: WannaCry Ransomware. [https://digital-forensics.sans.org/blog/2017/05/13/wannacry-ransomware](https://digital-forensics.sans.org/blog/2017/05/13/wannacry-ransomware)
