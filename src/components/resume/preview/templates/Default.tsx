"use client";

import { Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import React, { type JSX } from "react";

import dayjs from "@/lib/dayjs";
import { parseTiptapToPdfJsx } from "@/utils/parseTiptapToJSX";
import { SkillLevel } from "generated/prisma";

import { getItemTitle } from "../../edit/BackgroundDescription";

import type {
  CourseDraft,
  EducationDraft,
  LanguageDraft,
  LinkDraft,
  ProjectDraft,
  ResumeDraft,
  SkillDraft,
  WorkExperienceDraft,
} from "@/store/types";

enum Colors {
  white = "#fff",
  red = "#d32f2f",
  gray = "#ebebeb",
  grayText = "#828ba2",
  grayTextDark = "#444",
  grayBg = "rgba(0, 0, 0, 0.06)",
  grayBgDark = "#656e83",
  grayBgPdf = "#525659",
  mainBlue = "#1976d2",
}

const getMonthYear = (date: Date | null) => dayjs(date).format("MMM, YYYY");

const styles = StyleSheet.create({
  page: {
    paddingVertical: 25,
    paddingHorizontal: 35,
    backgroundColor: "#fff",
    fontFamily: "Open Sans",
  },
  sectionsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  left: {
    width: "100%",
    paddingRight: 25,
  },
  right: { width: "45%" },
});

const stylesLeft = StyleSheet.create({
  sectionTitle: { fontSize: 14, marginBottom: 5, fontWeight: 600 },
  itemContainer: { marginBottom: 20 },
  itemTitle: { fontSize: 12, fontWeight: 600 },
  itemSubtitle: {
    fontSize: 10,
    marginBottom: 3,
    color: Colors.grayBgDark,
  },
});

const stylesRight = StyleSheet.create({
  sectionTitle: { fontSize: 14, marginBottom: 3, fontWeight: 500 },
  itemWithLevelContainer: { marginBottom: 10 },
  itemLevelBar: {
    width: "100%",
    height: 2,
    marginTop: 4,
    backgroundColor: Colors.grayBg,
    position: "relative",
  },
  itemLevelBarInner: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: Colors.mainBlue,
  },
});

const stylesCommon = StyleSheet.create({
  sectionContainer: { marginBottom: 20 },
  itemText: { fontSize: 11 },
  link: { color: Colors.mainBlue, fontSize: 11, textDecoration: "none" },
});

// left section
export const LeftSectionTitle: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <Text style={{ ...stylesLeft.sectionTitle }}>{children}</Text>;
};

export const LeftItemContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <View style={stylesLeft.itemContainer}>{children}</View>;
};

export const LeftItemTitle: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <Text style={stylesLeft.itemTitle}>{children}</Text>;
};

export const LeftItemSubtitle: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <Text style={stylesLeft.itemSubtitle}>{children}</Text>;
};

//right
export const RightSectionTitle: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <Text style={stylesRight.sectionTitle}>{children}</Text>;
};

interface IRightItemWithLevelProps extends React.PropsWithChildren {
  title: string;
  levelInPercent: number;
  color: string;
}

export const RightItemWithLevel: React.FC<IRightItemWithLevelProps> = ({
  title,
  levelInPercent,
  color,
}) => {
  return (
    <View style={stylesRight.itemWithLevelContainer}>
      <ItemText>{title}</ItemText>
      {levelInPercent && (
        <View style={stylesRight.itemLevelBar}>
          <View
            style={{
              ...stylesRight.itemLevelBarInner,
              width: `${levelInPercent}%`,
              backgroundColor:
                color || stylesRight.itemLevelBarInner.backgroundColor,
            }}
          />
        </View>
      )}
    </View>
  );
};

// common
export const SectionContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <View style={stylesCommon.sectionContainer}>{children}</View>;
};

export const ItemText: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Text style={stylesCommon.itemText}>{children}</Text>;
};

interface ILinkCustomProps extends React.PropsWithChildren {
  src: string;
  color: string;
  isEmail?: boolean;
}

export const LinkCustom: React.FC<ILinkCustomProps> = ({
  src,
  isEmail,
  children,
  color,
}) => {
  return (
    <Link
      src={isEmail ? `mailto:${src}` : src}
      style={{ ...stylesCommon.link, color: color || stylesCommon.link.color }}
    >
      {children}
    </Link>
  );
};

interface ILinksProps {
  links: LinkDraft[];
  color: string;
}

export const Links: React.FC<ILinksProps> = ({ links, color }) => {
  return (
    <SectionContainer>
      <RightSectionTitle>Links</RightSectionTitle>
      {links.map(({ id, title, url }) => (
        <LinkCustom key={id} src={url} color={color}>
          {title}
        </LinkCustom>
      ))}
    </SectionContainer>
  );
};

interface ISkillsProps {
  skills: SkillDraft[];
  color: string;
}

const getSkillLevel = (lvl: SkillLevel): number => {
  switch (lvl) {
    case SkillLevel.Novice:
      return 5;
    case SkillLevel.Apprentice:
      return 21;
    case SkillLevel.Adept:
      return 42;
    case SkillLevel.Expert:
      return 63;
    case SkillLevel.Master:
      return 84;
    case SkillLevel.Legendary:
      return 100;
    default:
      return 0;
  }
};

export const Skills: React.FC<ISkillsProps> = ({ skills, color }) => {
  return (
    <SectionContainer>
      <RightSectionTitle>Skills</RightSectionTitle>
      {skills.map(({ id, title, level }, idx) => (
        <RightItemWithLevel
          key={`${id}-${idx}`}
          title={title}
          levelInPercent={getSkillLevel(level)}
          color={color}
        />
      ))}
    </SectionContainer>
  );
};

type Props = { resume: ResumeDraft };

type DetailsProps = {
  city: string;
  country: string;
  phone: string;
  email: string;
  color: string;
};
interface IHeaderProps {
  firstName: string;
  lastName: string;
  jobTitle: string;
}

const headerstyles = StyleSheet.create({
  section: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    objectFit: "cover",
    borderRadius: 5,
    marginRight: 15,
  },
  textBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: { fontWeight: 600 },
  subtitle: {
    fontSize: 11,
    color: Colors.grayTextDark,
  },
});

export const Header: React.FC<IHeaderProps> = ({
  firstName,
  lastName,
  jobTitle,
}) => {
  return (
    <View style={headerstyles.section}>
      {/* {photoUrl && <Image src={photoUrl} style={headerstyles.image} />} */}
      <View style={headerstyles.textBlock}>
        <Text style={headerstyles.title}>
          {firstName} {lastName}
        </Text>
        <Text style={headerstyles.subtitle}>{jobTitle}</Text>
      </View>
    </View>
  );
};

interface ILanguagesProps {
  languages: LanguageDraft[];
  color: string;
}

const getLevelInPercent = (level: string) => {
  switch (level) {
    case "A1":
      return 17;
    case "A2":
      return 35;
    case "B1":
      return 55;
    case "B2":
      return 70;
    case "C1":
      return 90;
    case "C2":
      return 100;
    default:
      return 0;
  }
};

export const Languages: React.FC<ILanguagesProps> = ({ languages, color }) => {
  return (
    <SectionContainer>
      <RightSectionTitle>Languages</RightSectionTitle>
      {languages.map(({ id, language, level }, idx) => {
        return (
          <RightItemWithLevel
            key={`${id}-${idx}`}
            title={language}
            levelInPercent={getLevelInPercent(level)}
            color={color}
          />
        );
      })}
    </SectionContainer>
  );
};

interface ICoursesProps {
  courses: CourseDraft[];
}
const combineWordsWithComma = (...args: string[]) => {
  return [...args].filter(Boolean).join(", ");
};

export const Courses: React.FC<ICoursesProps> = ({ courses }) => {
  return (
    <SectionContainer>
      <LeftSectionTitle>Courses</LeftSectionTitle>
      {courses.map(
        (
          { id, title, institution, startDate, endDate, endDateIsCurrent },
          idx,
        ) => (
          <LeftItemContainer key={`${id}-${idx}`}>
            <LeftItemTitle>
              {combineWordsWithComma(title, institution)}
            </LeftItemTitle>
            <LeftItemSubtitle>
              {getMonthYear(startDate)} -{" "}
              {endDateIsCurrent ? "Present" : getMonthYear(endDate)}
            </LeftItemSubtitle>
          </LeftItemContainer>
        ),
      )}
    </SectionContainer>
  );
};

const Details: React.FC<DetailsProps> = ({
  city,
  country,
  phone,
  email,
  color,
}) => {
  if (![city, country, phone, email].filter(Boolean).length) {
    return null;
  }

  return (
    <SectionContainer>
      <RightSectionTitle>Details</RightSectionTitle>
      <ItemText>{city}</ItemText>
      <ItemText>{country}</ItemText>
      <ItemText>{phone}</ItemText>
      <LinkCustom src={email} isEmail color={color}>
        {email}
      </LinkCustom>
    </SectionContainer>
  );
};

interface ISummaryProps {
  summary: JSX.Element;
}

export const SummarySection: React.FC<ISummaryProps> = ({ summary }) => {
  return (
    <SectionContainer>
      <LeftSectionTitle>Summary</LeftSectionTitle>
      {summary}
    </SectionContainer>
  );
};

interface IEmploymentHistoryProps {
  workExperience: WorkExperienceDraft[];
}

export const EmploymentHistory: React.FC<IEmploymentHistoryProps> = ({
  workExperience,
}) => {
  return (
    <SectionContainer>
      <LeftSectionTitle>Work Experience</LeftSectionTitle>
      {workExperience.map(
        ({
          id,
          jobTitle,
          employer,
          city,
          startDate,
          endDate,
          endDateIsCurrent,
          description,
        }) => (
          <LeftItemContainer key={id}>
            <LeftItemTitle>
              {getItemTitle(jobTitle, employer)}
              {city && `, ${city}`}
            </LeftItemTitle>
            <LeftItemSubtitle>
              {getMonthYear(startDate)} -{" "}
              {endDateIsCurrent ? "Present" : getMonthYear(endDate)}
            </LeftItemSubtitle>
            {parseTiptapToPdfJsx(description)}
          </LeftItemContainer>
        ),
      )}
    </SectionContainer>
  );
};

interface IEducationProps {
  education: EducationDraft[];
}

export const Education: React.FC<IEducationProps> = ({ education }) => {
  return (
    <SectionContainer>
      <LeftSectionTitle>Education</LeftSectionTitle>
      {education.map(
        (
          {
            id,
            school,
            degree,
            city,
            startDate,
            endDate,
            endDateIsCurrent,
            description,
          },
          idx,
        ) => (
          <LeftItemContainer key={`${id}-${idx}`}>
            <LeftItemTitle>
              {combineWordsWithComma(degree, school, city)}
            </LeftItemTitle>
            <LeftItemSubtitle>
              {getMonthYear(startDate)} -{" "}
              {endDateIsCurrent ? "Present" : getMonthYear(endDate)}
            </LeftItemSubtitle>
            {parseTiptapToPdfJsx(description)}
          </LeftItemContainer>
        ),
      )}
    </SectionContainer>
  );
};

interface ProjectsProps {
  projects: ProjectDraft[];
  color: string;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, color }) => {
  return (
    <SectionContainer>
      <LeftSectionTitle>Projects</LeftSectionTitle>
      {projects.map(({ id, title, url, description, repoUrl }, idx) => (
        <LeftItemContainer key={`${id}-${idx}`}>
          <LeftItemTitle>{title}</LeftItemTitle>
          <View
            style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}
          >
            <View>
              {url && (
                <View style={{ marginRight: 10 }}>
                  <LinkCustom src={url} color={color}>
                    Project
                  </LinkCustom>
                </View>
              )}
            </View>
            {url && repoUrl && (
              <View style={{ marginRight: 10 }}>
                <Text style={{ fontSize: 11 }}>|</Text>
              </View>
            )}
            <View>
              {repoUrl && (
                <LinkCustom src={repoUrl} color={color}>
                  Repository
                </LinkCustom>
              )}
            </View>
          </View>
          {parseTiptapToPdfJsx(description)}
        </LeftItemContainer>
      ))}
    </SectionContainer>
  );
};

export const DefaultTemplate: React.FC<Props> = ({ resume }) => {
  const {
    summary,
    workExperience,
    projects,
    education,
    links,
    skills,
    languages,
    courses,
    themeColor,
  } = resume;

  return (
    <Page size="A4" style={styles.page}>
      <Header
        firstName={resume.firstName}
        lastName={resume.lastName}
        jobTitle={resume.jobTitle}
      />
      <View style={styles.sectionsContainer}>
        <View style={styles.left}>
          {!!summary.length && (
            <SummarySection summary={parseTiptapToPdfJsx(summary)} />
          )}
          {!!workExperience.length && (
            <EmploymentHistory workExperience={workExperience} />
          )}
          {!!projects.length && (
            <Projects projects={projects} color={themeColor} />
          )}
          {!!education.length && <Education education={education} />}
          {!!courses.length && <Courses courses={courses} />}
        </View>
        <View style={styles.right}>
          <Details
            city={resume.city}
            country={resume.country}
            phone={resume.phone}
            email={resume.email}
            color={themeColor}
          />
          {!!links.length && <Links links={resume.links} color={themeColor} />}
          {!!skills.length && <Skills skills={skills} color={themeColor} />}
          {!!languages.length && (
            <Languages languages={languages} color={themeColor} />
          )}
        </View>
      </View>
    </Page>
  );
};
