import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

import { ResumeItem } from '../../types/resumeTypes';

// --- CONSTANTS ---
const PORTFOLIO_LINK = {
    id: 'portfolio',
    name: 'Portfolio',
    link: 'https://asmirnov.ee',
};

// --- STYLES ---
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
        fontSize: 16,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        marginBottom: 8,
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
        marginHorizontal: 4,
        fontSize: 10,
        fontWeight: 'normal',
        textDecoration: 'none',
    },
    sectionTitle: {
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        marginBottom: 4,
        paddingBottom: 2,
        letterSpacing: 0.5,
        marginTop: 4,
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
        textAlign: 'left',
        hyphens: 'none',
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
        textAlign: 'left',
        hyphens: 'none',
    },
    skillRow: {
        flexDirection: 'row',
        marginBottom: 2,
        alignItems: 'flex-start',
    },
    skillCategory: {
        fontFamily: 'Helvetica-Bold',
        width: 110,
    },
    skillList: {
        flex: 1,
    },
});

// --- HELPERS ---

const Separator = () => <Text style={styles.separator}>|</Text>;

const formatText = (text: string) => {
    const cleanText = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
    const linkRegex = /\[([^\]]+)]\(([^)]+)\)/g;
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
    return text
        .split('\n')
        .filter((line) => line.trim().length > 0)
        .map((line, index) => {
            const lineWithoutBullet = line.replace(/^[\s-•]+/, '');
            return (
                <View key={index} style={styles.bulletPoint}>
                    <Text style={styles.bulletChar}>•</Text>
                    <Text style={styles.bulletText}>{formatText(lineWithoutBullet)}</Text>
                </View>
            );
        });
};

const groupSkills = (skills: ResumeItem['skills']): [string, string[]][] => {
    if (!skills) return [];
    const grouped = skills.reduce(
        (acc, skill) => {
            const group = skill.skillGroup || 'Other';
            if (!acc[group]) acc[group] = [];
            acc[group].push(skill.name);
            return acc;
        },
        {} as Record<string, string[]>,
    );
    return Object.entries(grouped);
};

const stripMarkdown = (text: string) => {
    if (!text) return '';
    return text.replace(/(\*\*|__)(.*?)\1/g, '$2').replace(/\n/g, ' ');
};

// --- COMPONENT ---

export const ResumePdf = ({ resume }: { resume: ResumeItem }) => {
    const groupedSkills = groupSkills(resume.skills);
    const allMediaLinks = [...(resume.mediaLinks || []), PORTFOLIO_LINK];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* HEADER */}
                <View style={styles.header}>
                    <Text style={styles.name}>{resume.fullName}</Text>

                    {(resume.email || resume.phone) && (
                        <View style={styles.contactRow}>
                            {resume.email && <Text>{resume.email}</Text>}
                            {resume.email && resume.phone && <Separator />}
                            {resume.phone && <Text>{resume.phone}</Text>}
                        </View>
                    )}

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

                    {resume.intro && <Text style={styles.intro}>{resume.intro}</Text>}
                    {resume.location && <Text style={styles.location}>{resume.location}</Text>}
                </View>

                {/* SUMMARY */}
                {resume.summary && (
                    <View style={{ marginBottom: 8 }}>
                        <Text style={styles.sectionTitle}>Summary</Text>
                        <Text style={styles.description}>{stripMarkdown(resume.summary)}</Text>
                    </View>
                )}

                {/* SKILLS */}
                {groupedSkills.length > 0 && (
                    <React.Fragment>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        {groupedSkills.map(([group, skills], index) => {
                            const isLast = index === groupedSkills.length - 1;
                            return (
                                <View
                                    key={group}
                                    style={[styles.skillRow, isLast ? { marginBottom: 8 } : {}]}
                                    wrap={false}
                                >
                                    <Text style={styles.skillCategory}>{group}:</Text>
                                    <Text style={styles.skillList}>{skills.join(', ')}</Text>
                                </View>
                            );
                        })}
                    </React.Fragment>
                )}

                {/* WORK EXPERIENCE */}
                {resume.workExperiences && resume.workExperiences.length > 0 && (
                    <React.Fragment>
                        <Text style={styles.sectionTitle}>Work Experience</Text>
                        {resume.workExperiences.map((job, index) => {
                            const isLast = index === resume.workExperiences!.length - 1;

                            return (
                                <View
                                    key={job.id}
                                    style={[
                                        styles.entryContainer,
                                        isLast ? { marginBottom: 8 } : {},
                                    ]}
                                >
                                    <View wrap={false}>
                                        <View style={styles.entryHeaderRow}>
                                            <Text style={styles.entryTitle}>{job.company}</Text>
                                            <Text style={styles.entryDate}>
                                                {job.startDate} – {job.endDate || 'Present'}
                                            </Text>
                                        </View>
                                        <Text style={styles.entrySubtitle}>{job.position}</Text>
                                    </View>

                                    {job.description && (
                                        <View>{renderDescription(job.description)}</View>
                                    )}
                                </View>
                            );
                        })}
                    </React.Fragment>
                )}

                {/* PROJECTS */}
                {resume.projects && resume.projects.length > 0 && (
                    <React.Fragment>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {resume.projects.map((project, index) => {
                            const isLast = index === resume.projects!.length - 1;

                            return (
                                <View
                                    key={project.id}
                                    style={[
                                        styles.entryContainer,
                                        isLast ? { marginBottom: 8 } : {},
                                    ]}
                                >
                                    <View wrap={false}>
                                        <View style={styles.entryHeaderRow}>
                                            <Text style={styles.entryTitle}>{project.title}</Text>
                                        </View>
                                        {project.subTitle && (
                                            <Text style={styles.entrySubtitle}>
                                                {project.subTitle}
                                            </Text>
                                        )}
                                    </View>
                                    {project.description && (
                                        <View>{renderDescription(project.description)}</View>
                                    )}
                                </View>
                            );
                        })}
                    </React.Fragment>
                )}

                {/* EDUCATION */}
                {resume.educations && resume.educations.length > 0 && (
                    <React.Fragment>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {resume.educations.map((edu, index) => {
                            const isLast = index === resume.educations!.length - 1;

                            return (
                                <View
                                    key={edu.id}
                                    style={[
                                        styles.entryContainer,
                                        isLast ? { marginBottom: 8 } : {},
                                    ]}
                                >
                                    <View wrap={false}>
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
                                    </View>

                                    {edu.description && (
                                        <View style={{ marginTop: 2 }}>
                                            {renderDescription(edu.description)}
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </React.Fragment>
                )}
            </Page>
        </Document>
    );
};
