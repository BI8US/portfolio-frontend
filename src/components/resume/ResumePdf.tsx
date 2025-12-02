import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

import { ResumeItem } from '../../types/resumeTypes';

const portfolioLink = {
    id: 'portfolio',
    name: 'Portfolio',
    link: 'https://asmirnov.pages.dev',
};

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        lineHeight: 1.3,
        fontSize: 10,
        color: '#000000',
        backgroundColor: '#FFFFFF',
    },
    header: {
        marginBottom: 4,
        paddingBottom: 2,
        alignItems: 'flex-start',
    },
    name: {
        fontSize: 18,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    intro: {
        fontFamily: 'Helvetica-Oblique',
        color: '#4B5563',
        marginBottom: 2,
    },
    location: {
        fontFamily: 'Helvetica-Oblique',
        color: '#4B5563',
        marginBottom: 2,
    },
    contactRow: {
        flexDirection: 'row',
        gap: 5,
        marginBottom: 2,
    },
    link: {
        flexDirection: 'row',
        gap: 5,
        marginBottom: 2,
        color: '#000000',
    },
    inlineLink: {
        color: '#000000',
    },
    separator: {
        marginHorizontal: 2,
        color: '#9CA3AF',
    },
    generatedNote: {
        color: '#9CA3AF',
        fontFamily: 'Helvetica-Oblique',
    },

    section: {
        marginBottom: 8,
    },
    sectionTitle: {
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        marginBottom: 4,
        paddingBottom: 2,
        letterSpacing: 0.5,
    },

    entryContainer: {
        marginBottom: 6,
    },
    entryHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 1,
    },
    entryTitle: {
        fontFamily: 'Helvetica-Bold',
    },
    entryDate: {
        fontFamily: 'Helvetica',
        textAlign: 'right',
        color: '#374151',
    },
    entrySubtitle: {
        fontFamily: 'Helvetica-Oblique',
        marginBottom: 1,
    },

    description: {
        marginTop: 2,
        textAlign: 'justify',
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 1,
        paddingLeft: 6,
    },
    bulletChar: {
        width: 10,
        fontSize: 10,
        lineHeight: 1.3,
    },
    bulletText: {
        flex: 1,
        textAlign: 'justify',
    },
    skillRow: {
        flexDirection: 'row',
        marginBottom: 2,
        alignItems: 'flex-start',
    },
    skillCategory: {
        fontFamily: 'Helvetica-Bold',
        width: 110,
        marginRight: 0,
    },
    skillList: {
        flex: 1,
    },
});

const formatText = (text: string) => {
    const cleanText = text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/__(.*?)__/g, '$1');

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(cleanText)) !== null) {
        if (match.index > lastIndex) {
            parts.push(
                <Text key={`t-${lastIndex}`}>{cleanText.substring(lastIndex, match.index)}</Text>,
            );
        }

        parts.push(
            <Link key={`l-${match.index}`} src={match[2]} style={styles.inlineLink}>
                {match[1]}
            </Link>,
        );

        lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < cleanText.length) {
        parts.push(<Text key={`t-${lastIndex}`}>{cleanText.substring(lastIndex)}</Text>);
    }

    return parts.length > 0 ? parts : cleanText;
};

const renderDescription = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n').filter((line) => line.trim().length > 0);

    return lines.map((line, index) => {
        const lineWithoutBullet = line.replace(/^\s*-\s*/, '').replace(/^\s*•\s*/, '');

        return (
            <View key={index} style={styles.bulletPoint}>
                <Text style={styles.bulletChar}>•</Text>
                <Text style={styles.bulletText}>{formatText(lineWithoutBullet)}</Text>
            </View>
        );
    });
};

const groupSkills = (skills: any[]) => {
    const grouped: Record<string, string[]> = {};

    skills.forEach((skill) => {
        const group = skill.skillGroup || 'Other';
        if (!grouped[group]) grouped[group] = [];
        grouped[group].push(skill.name);
    });

    return Object.entries(grouped);
};

const stripMarkdown = (text: string) => {
    if (!text) return '';
    return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\n/g, ' ');
};

export const ResumePdf = ({ resume }: { resume: ResumeItem }) => {
    const groupedSkills = resume.skills ? groupSkills(resume.skills) : [];
    const Separator = () => (
        <Text
            style={{
                marginHorizontal: 4,
                fontSize: 10,
                fontWeight: 'normal',
                textDecoration: 'none',
            }}
        >
            |
        </Text>
    );
    const allMediaLinks = [...(resume.mediaLinks || []), portfolioLink];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* HEADER */}
                <View style={styles.header}>
                    {/* 1. NAME */}
                    <Text style={styles.name}>{resume.fullName}</Text>

                    {/* CONTACTS */}
                    {(resume.email || resume.phone) && (
                        <View style={styles.contactRow}>
                            {resume.email && <Text>{resume.email}</Text>}
                            {resume.email && resume.phone && <Separator />}
                            {resume.phone && <Text>{resume.phone}</Text>}
                        </View>
                    )}

                    {/* LINKS */}
                    <View style={styles.contactRow}>
                        {allMediaLinks.map((link, i) => (
                            <React.Fragment key={link.id}>
                                {i > 0 && <Separator />}
                                <Link src={link.link} style={styles.link}>
                                    {link.link.replace(/^https?:\/\/(www\.)?/, '')}
                                </Link>
                            </React.Fragment>
                        ))}
                    </View>

                    {/* INTRO */}
                    {resume.intro && <Text style={styles.intro}>{resume.intro}</Text>}

                    {/* LOCATION */}
                    {resume.location && <Text style={styles.location}>{resume.location}</Text>}
                </View>

                {/* SUMMARY */}
                {resume.summary && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Summary</Text>
                        <Text style={styles.description}>{stripMarkdown(resume.summary)}</Text>
                    </View>
                )}

                {/* SKILLS */}
                {groupedSkills.length > 0 && (
                    <View style={styles.section} wrap={false}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        {groupedSkills.map(([group, skills]) => (
                            <View key={group} style={styles.skillRow}>
                                <Text style={styles.skillCategory}>{group}:</Text>
                                <Text style={styles.skillList}>{skills.join(', ')}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* WORK EXPERIENCE */}
                {resume.workExperiences && resume.workExperiences.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Work Experience</Text>
                        {resume.workExperiences.map((job) => (
                            <View key={job.id} style={styles.entryContainer} wrap={false}>
                                <View style={styles.entryHeaderRow}>
                                    <Text style={styles.entryTitle}>{job.company}</Text>
                                    <Text style={styles.entryDate}>
                                        {job.startDate} – {job.endDate || 'Present'}
                                    </Text>
                                </View>
                                <Text style={styles.entrySubtitle}>{job.position}</Text>
                                {job.description && (
                                    <View>{renderDescription(job.description)}</View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* PROJECTS */}
                {resume.projects && resume.projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {resume.projects.map((project) => (
                            <View key={project.id} style={styles.entryContainer} wrap={false}>
                                <View style={styles.entryHeaderRow}>
                                    <Text style={styles.entryTitle}>{project.title}</Text>
                                </View>
                                {project.subTitle && (
                                    <Text style={styles.entrySubtitle}>{project.subTitle}</Text>
                                )}
                                {project.description && (
                                    <View>{renderDescription(project.description)}</View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* EDUCATION */}
                {resume.educations && resume.educations.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {resume.educations.map((edu) => (
                            <View key={edu.id} style={styles.entryContainer} wrap={false}>
                                <View style={styles.entryHeaderRow}>
                                    <Text style={styles.entryTitle}>
                                        {edu.school}
                                        {edu.school && edu.educationName ? ' | ' : ''}
                                        <Text style={{ fontFamily: 'Helvetica' }}>
                                            {edu.educationName}
                                        </Text>
                                    </Text>
                                    <Text style={styles.entryDate}>
                                        {edu.startDate} – {edu.endDate || 'Present'}
                                    </Text>
                                </View>
                                {edu.description && (
                                    <View style={{ marginTop: 2 }}>
                                        {renderDescription(edu.description)}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
};
