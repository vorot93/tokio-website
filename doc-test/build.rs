fn main() {
    let mut doc_files = Vec::new();
    doc_files.extend(skeptic::markdown_files_of_directory("../content/docs/getting-started"));
    doc_files.push("../content/docs/going-deeper/futures.md".into());
    skeptic::generate_doc_tests(&doc_files);
}
