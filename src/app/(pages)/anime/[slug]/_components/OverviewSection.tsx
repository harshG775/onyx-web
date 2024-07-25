import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SectionTitle from "@/components/ui/SectionTitle";

const infoTabsData = [
    {
        name: "Overview",
    },
    {
        name: "Characters",
    },
    {
        name: "Staff",
    },
];

export default function OverviewSection() {
    return (
        <Tabs defaultValue={infoTabsData[0].name} className="container mt-10">
            <TabsList>
                {infoTabsData.map((tab, i) => (
                    <TabsTrigger value={tab.name} key={tab.name + i}>
                        {tab.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            {infoTabsData.map((tab, i) => (
                <TabsContent
                    value={tab.name}
                    className="container min-h-96"
                    key={tab.name + i}
                >
                    <SectionTitle title={tab.name} />
                </TabsContent>
            ))}
        </Tabs>
    );
}
