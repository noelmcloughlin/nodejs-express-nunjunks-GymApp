'use script';

const analytics =
    {
    }
}
public class Analytics
{
    public static MemberStats generateMemberStats(Member member)
{
    MemberStats stats = new MemberStats();

    double weight = member.startingweight;
    List<Assessment> assessments = member.assessments;
    if (assessments.size() > 0) {
    Assessment assessment = assessments.get(assessments.size() - 1);
    weight = assessment.weight;
}
stats.bmi = calculateBMI(member, weight);
stats.bmiCategory = determineBMICategory(stats.bmi);
stats.isIdealBodyweight = isIdealBodyWeight(member, weight);
stats.trend = true;
if (assessments.size()>1) {
    stats.trend = assessments.get(assessments.size() - 2).weight > assessments.get(assessments.size() - 1).weight;
}
return stats;
}